import AsyncStorage from '@react-native-async-storage/async-storage';
import { signupLink, updateUserDataLink, verificationLink, loginLink, lookupUserLink, refreshTokenLink } from './firebaseLinks';
import { saveDataToStorage } from './AppActions';

export const signup = (email, userName, password) => {
    return async dispatch => {
        // Sign up request
        const createUser = await fetch(signupLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!createUser.ok) {
            const errorRes = await createUser.json();
            if (errorRes.error.message === 'EMAIL_EXISTS') {
                throw new Error('This email address is already in use by another account.');
            }
            else {
                console.log(errorRes.error.message)
                throw new Error('Sorry, Something Went Wrong!');
            }
        }

        const newUserData = await createUser.json();
        const token = newUserData.idToken;

        // Second request to update the user name, (did not find a way to do that during the creation of the account).
        const updateUserName = await fetch(updateUserDataLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: token,
                displayName: userName
            })
        })

        if (!updateUserName.ok) {
            throw new Error('An error occured while creating the account, try again later');
        }

        // Third request to send verification link to the user email.
        const verifyEmail = await fetch(verificationLink, {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'VERIFY_EMAIL',
                idToken: token
            })
        });

        if (!verifyEmail.ok) {
            throw new Error('An error occured while sending verification link, please try again');
        }
    };
};

export const login = (email, password) => {
    return async dispatch => {

        const login = await fetch(loginLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!login.ok) {
            const errorRes = await login.json();
            if (errorRes.error.message === 'EMAIL_NOT_FOUND') {
                throw new Error('Invalid Email Address');
            }
            else if (errorRes.error.message === 'INVALID_PASSWORD') {
                throw new Error('Invalid Password');
            }
            else if (errorRes.error.message === 'USER_DISABLED') {
                throw new Error('The account has been disabled by an administrator');
            }
            else {
                throw new Error('Invalid email or password');
            }
        }

        const loginData = await login.json();

        // Get the user's data to check if the email is verified
        const user = await fetch(lookupUserLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: loginData.idToken
            })
        });

        const userData = await user.json();

        const isVerified = userData.users[0].emailVerified;

        if (isVerified) {
            const expirationTime = new Date(new Date().getTime() + parseInt(loginData.expiresIn) * 1000);
            dispatch({
                type: 'SIGNIN',
                isVerified: isVerified,
                token: loginData.idToken,
                refreshToken: loginData.refreshToken,
                expirationTime: expirationTime,
                userId: loginData.localId,
                email: loginData.email,
                userName: loginData.displayName
            });
            saveDataToStorage(loginData.idToken, loginData.refreshToken, expirationTime);
        }
        else {
            throw new Error('Email is not verified');
        }
    };
};

export const authenticateUser = (token, refreshToken, expirationTime) => {
    // used to auto-login user (see StartupScreen)
    return async dispatch => {

        // get user data
        const response = await fetch(lookupUserLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: token
            })
        });

        if (!response.ok) {
            const errorRes = await response.json();
            throw new Error(errorRes.error.message);
        }

        const resData = await response.json();

        const userName = resData.users[0].displayName;
        const email = resData.users[0].email;
        const userId = resData.users[0].localId;

        dispatch({
            type: 'AUTHENTICATE',
            token: token,
            refreshToken: refreshToken,
            expirationTime: expirationTime,
            userId: userId,
            email: email,
            userName: userName
        });
    };
};

export const resendVerificationLink = async (email, password) => {

    // login request to get idToken
    const login = await fetch(loginLink, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    });

    const loginData = await login.json();

    // Send new verification link.
    const verifyEmail = await fetch(verificationLink, {
        method: 'POST',
        body: JSON.stringify({
            requestType: 'VERIFY_EMAIL',
            idToken: loginData.idToken,
        })
    });

    if (!verifyEmail.ok) {
        throw new Error('Sorry, Something went wrong');
    }
};

export const refreshExpiredToken = (refreshToken) => {
    return async dispatch => {

        const response = await fetch(refreshTokenLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            })
        });

        if (!response.ok) {
            const errorRes = await response.json();
            throw new Error(errorRes.error.message);
        }

        const resData = await response.json();

        const expirationTime = new Date(new Date().getTime() + parseInt(resData['expires_in']) * 1000);
        saveDataToStorage(resData['id_token'], resData['refresh_token'], expirationTime);

        try {
            // got a new token, saved locally in the device to be used next time the user login in if it is not expired yet
            // now dispatch authenticateUser action with a new token;
            dispatch(authenticateUser(resData['id_token'], refreshToken, expirationTime));
        }
        catch (err) {
            throw new Error(err.message);
        }
    };

};

export const changeUserName = (userName) => {
    return async (dispatch, getState) => {

        let token = getState().auth.token;

        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        const response = await fetch(updateUserDataLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: token,
                displayName: userName,
                photoUrl: '',
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            throw new Error('An error occured while changing your user name, please try again later');
        }

        dispatch({ type: 'CHANGE_USER_NAME', userName: userName });
    };
}; 