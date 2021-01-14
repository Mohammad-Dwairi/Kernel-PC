import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshExpiredToken } from './AuthActions';
import { getUserInfo, updateUserDataLink, updateUserInfo, uploadUserInfoLink } from './firebaseLinks';


export const uploadUserInfo = (userName, phoneNumber, address) => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;

        const userInfo = {
            userName: userName,
            phoneNumber: phoneNumber,
            address: address
        };
        const response = await fetch(uploadUserInfoLink(userId, token), {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(userInfo)
        });

        if (!response.ok) {
            throw new Error('An error occured while uplaoding your info, try agian later');
        }
    };

};

export const setUserInfo = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const token = getState().auth.token;
        const email = getState().auth.email;

        const response = await fetch(getUserInfo(userId, token));
        if (!response.ok) {
            throw new Error('An error occured while loading your information, try again later');
        }
        
        const resData = await response.json();
        console.log(resData, 'RESPONSE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        let key;
        try {
            key = Object.keys(resData)[0];
        }
        catch(err) {
            return;
        }

        const userData = resData[key];

        dispatch({
            type: 'SET_USER',
            userId: userId,
            email: email,
            userName: userData.userName ? userData.userName : '',
            phoneNumber: userData.phoneNumber ? userData.phoneNumber : '',
            address: userData.address ? userData.address : ''
        });
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

export const changePhoneNumber = (phoneNumber) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        let token = getState().auth.token;

        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        //Get request to get the firebase key for the user information node.
        const response = await fetch(getUserInfo(userId, token));

        if (!response.ok) {
            throw new Error("An error occured while changing your phone number, try again later");
        }
        const resData = await response.json();

        const key = Object.keys(resData)[0]; // Get the node key in firebase

        // PATCH request to update phone number
        const response2 = await fetch(updateUserInfo(userId, key, token), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber
            })
        });

        if (!response2.ok) {
            throw new Error("An error occured while changing your phone number, try again later");
        }

        dispatch({ type: 'CHANGE_PHONE_NUMBER', phoneNumber: phoneNumber });
    };
};

export const changeAddress = (address) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;

        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        // Get firebase key for the user info node
        const response = await fetch(getUserInfo(userId, token));

        if (!response.ok) {
            throw new Error("An error occured while changing your phone number, try again later");
        }

        let key;
        const resData = await response.json();
        if (resData) {
            key = Object.keys(resData)[0];
        }

        // PATCH request to update address
        const response2 = await fetch(updateUserInfo(userId, key, token), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                address: address
            })
        });

        if (!response2.ok) {
            throw new Error("An error occured while changing your phone number, try again later");
        }

        dispatch({ type: 'CHANGE_ADDRESS', address: address });
    };
};

export const addPhoneNumber = (phoneNumber) => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const token = getState().auth.token;
        const userName = getState().auth.userName;

        const response = await fetch(uploadUserInfoLink(userId, token), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                phoneNumber: phoneNumber
            })
        });

        dispatch({type: 'CHANGE_PHONE_NUMBER', phoneNumber: phoneNumber});
    };
};

export const addAddress = (address) => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const token = getState().auth.token;
        const userName = getState().auth.userName;

        const response = await fetch(uploadUserInfoLink(userId, token), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                address: address
            })
        });

        dispatch({type: 'CHANGE_ADDRESS', address: address});
    };
};