import Order from '../../models/Order';
import Product from '../../models/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addOrderLink, addReviewLink, addToWishlistLink, dislikeLink, fetchOrdersLink, fetchProductLink, fetchProductsLink, fetchReviewsLink, fetchSpecialProductsIdsLink, fetchWishlistKeysLink, fetchLikedUsersLink, likeLink, loginLink, lookupUserLink, refreshTokenLink, removeFromWishlistLink, signupLink, updateProductLink, updateUserDataLink, verificationLink, fetchDislikedUsersLink } from './firebaseLinks';

export const setDark = (value) => {
    try {
        AsyncStorage.setItem('darkMode', JSON.stringify({ darkMode: value }));
    } catch (error) {
        console.log(error);
    }
    return { type: 'SET_DARK', isDark: value };
};

export const fetchProducts = (categoryId) => {
    return async dispatch => {
        const response = await fetch(fetchProductsLink(categoryId));

        if (!response.ok) {
            throw new Error('Something went wrong when loading this category, try again later');
        }

        const fetchedData = await response.json();

        const products = [];
        for (let key in fetchedData) {
            products.push(
                new Product(
                    key,
                    fetchedData[key].categoryId,
                    fetchedData[key].brand,
                    fetchedData[key].model,
                    fetchedData[key].price,
                    fetchedData[key].color,
                    fetchedData[key].images,
                    fetchedData[key].quantity,
                    fetchedData[key].description,
                    fetchedData[key].likes,
                    fetchedData[key].dislikes
                )
            );
        }
        dispatch({ type: 'SET_PRODUCTS', products: products });
    };
};

export const fetchSpecialProducts = () => {
    return async dispatch => {

        const productIds = [];
        const products = [];

        // First: fetch Special product ids from firebase.

        const response = await fetch(fetchSpecialProductsIdsLink);
        const fetchedData = await response.json();

        if (!response.ok) {
            throw new Error('Something went wrong when loading special products.');
        }

        for (let key in fetchedData) {
            productIds.push(fetchedData[key]);
        }

        //Second: fetch the products by their ids.
        for (let id of productIds) {
            const response = await fetch(fetchProductLink(id));
            const resData = await response.json();
            products.push(
                new Product(
                    id,
                    resData.categoryId,
                    resData.brand,
                    resData.model,
                    resData.price,
                    resData.color,
                    resData.images,
                    resData.quantity,
                    resData.description,
                    resData.likes,
                    resData.dislikes
                )
            );
        }
        dispatch({ type: 'SET_SPECIAL_PRODUCTS', specialProducts: products });
    };
};

export const addToCart = product => {
    return { type: 'ADD_TO_CART', product: product };
};

export const increaseQuantity = (index) => {
    return { type: 'INCREASE_QAUNTITY', index: index };
};

export const decreaseQuantity = (index) => {
    return { type: 'DECREASE_QAUNTITY', index: index };
};

export const addOrder = (cartItems, subtotal, taxes, shippingFees, totalPrice, totalQuantity) => {
    return async (dispatch, getState) => {

        let token = getState().auth.token;  // Getting user token and id from AuthReducer.
        const userId = getState().auth.userId;
        const userName = getState().auth.userName;
        const email = getState().auth.email;
        const refershToken = getState().auth.refershToken;
        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        const date = new Date(); // store order's Date.

        if (expiryDate <= new Date()) {
            // if the token is expired; request a refresh token
            dispatch(refreshExpiredToken(refershToken, email, userName));
            token = getState().auth.token;
        }

        // Iterate over cart Items to subtract each item quantity from the overall inStock quantity of the product. 
        cartItems.forEach(async item => {

            // Get the product by its id, (The cartItem id and product id are the same);
            const response = await fetch(fetchProductLink(item.id));

            if (!response.ok) {
                throw new Error('An Error occured when trying to add the order. try again later');
            }

            const resData = await response.json();
            const inStock = resData.quantity;

            // PATCH request to update 'quantity' child of the product.
            await fetch(updateProductLink(item.id, token), {
                method: 'PATCH',
                body: JSON.stringify({ quantity: inStock - item.quantity })
            });
        });

        // Adding the order to firebase
        const response = await fetch(addOrderLink(userId, token), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                email: email,
                cartItems: cartItems,
                subtotal: subtotal,
                taxes: taxes,
                shippingFees: shippingFees,
                totalPrice: totalPrice,
                totalQuantity: totalQuantity,
                date: date.toISOString()
            })
        });

        const resData = await response.json();
        dispatch({
            type: 'ADD_ORDER',
            id: resData.name,
            cartItems: cartItems,
            subtotal: subtotal,
            taxes: taxes,
            shippingFees: shippingFees,
            totalPrice: totalPrice,
            totalQuantity: totalQuantity,
            date: date.toISOString()
        });
    };
};

export const fetchOrders = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const loadedOrders = [];

        // fetch orders for the current user.
        const response = await fetch(fetchOrdersLink(userId));
        if (!response.ok) {
            throw new Error('Something went wrong when loading your orders, please try again later');
        }

        const resData = await response.json();

        for (const key in resData) {
            loadedOrders.push(
                new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].subtotal,
                    resData[key].taxes,
                    resData[key].shippingFees,
                    resData[key].totalPrice,
                    resData[key].totalQuantity,
                    resData[key].date
                )
            );
        }
        dispatch({ type: 'LOAD_ORDERS', orders: loadedOrders })
    };
};

export const addToWishlist = product => {
    return async (dispatch, getState) => {

        let token = getState().auth.token;
        const userId = getState().auth.userId;

        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        // Add product to the user's wishlist.
        const response = await fetch(addToWishlistLink(userId, token), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product.id)
        });

        if (!response.ok) {
            throw new Error('Something went wrong when adding the product to your wishlist, try again later');
        }

        const resData = await response.json();

        dispatch({
            type: 'ADD_TO_WISHLIST',

            // The product is stored under new key in the firebase
            // we need this "key" to use it in removeFromWishlistLink link.
            // So we store the key with the product in the wishlist reducer
            product: { key: resData.name, product: product }
        })
    };
};

export const removeFromWishlist = (index) => {
    return async (dispatch, getState) => {

        let token = getState().auth.token;
        const userId = getState().auth.userId;

        const productKey = getState().wishlist.products[index].key;

        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        // DELETE request to delete spcific product from the user's wishlist.
        const response = await fetch(removeFromWishlistLink(userId, productKey, token), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error("Something went wrong when removing the product from your wishlist, try again later");
        }

        dispatch({
            type: 'REMOVE_FROM_WISHLIST',
            index: index
        });
    };
};

export const fetchWishlist = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;

        const loadedProducts = [];

        // get the wishlist products keys (the product is a node labeled by the orginal ( id ) under each key)
        const response = await fetch(fetchWishlistKeysLink(userId));

        if (!response.ok) {
            throw new Error('Something went wrong when loading your wishlist, try again later');
        }

        const resData = await response.json();

        // iterate over the keys, get the product id, make a request with the product id to get it form products node
        for (const key in resData) {
            const productId = resData[key];
            const productResponse = await fetch(fetchProductLink(productId));

            if (!productResponse.ok) {
                throw new Error('Something went wrong when loading your wishlist, try again later');
            }

            const product = await productResponse.json();
            loadedProducts.push(
                {
                    key: key,
                    product: new Product(
                        productId,
                        product.categoryId,
                        product.brand,
                        product.model,
                        product.price,
                        product.color,
                        product.images,
                        product.quantity,
                        product.description,
                        product.likes,
                        product.dislikes
                    )
                }

            );
        }

        dispatch({ type: 'LOAD_WISHLIST', products: loadedProducts })
    };
};

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

const saveDataToStorage = (token, refreshToken, expirationTime) => {
    // Data stored locally in the mobile storage. typically used to auto-login the user or request refresh token.
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        refreshToken: refreshToken,
        expirationTime: expirationTime.toISOString(),
    }))
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

export const addReview = (review) => {
    return async (dispatch, getState) => {

        review.date = review.formattedDate; // replace normal js date with formatted date (see Review model)

        let token = getState().auth.token;

        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        const productId = getState().reviews.currentProductId;

        const response = await fetch(addReviewLink(productId, token), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });

        if (!response.ok) {
            throw new Error('An error occured when adding your review, please try again later');
        }

        dispatch({ type: 'ADD_REVIEW', review: review });
    };
};

export const fetchReviews = () => {
    return async (dispatch, getState) => {

        const productId = getState().reviews.currentProductId;

        const response = await fetch(fetchReviewsLink(productId));
        if (!response.ok) {
            throw new Error("An error occured while loading the reviews, try again later");
        }

        const resData = await response.json();

        let reviews = [];
        for (let key in resData) {
            reviews.push(resData[key]);
        }

        dispatch({ type: 'LOAD_REVIEWS', reviews: reviews });
    };
};

export const like = (numOfLikes, type) => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const productId = getState().reviews.currentProductId;

        let token = getState().auth.token;

        const userName = getState().auth.userName;

        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        if (type === 'add') {
            await fetch(likeLink(productId, userId, token), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userName)
            });
            dispatch({ type: 'SET_LIKED', isLiked: true });
        }
        else {
            await fetch(likeLink(productId, userId, token), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            dispatch({ type: 'SET_LIKED', isLiked: false });
        }

        await fetch(updateProductLink(productId, token), {
            method: 'PATCH',
            body: JSON.stringify({
                likes: numOfLikes
            })
        })

    };
};

export const dislike = (numOfLikes, type) => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const productId = getState().reviews.currentProductId;

        let token = getState().auth.token;

        const userName = getState().auth.userName;

        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        // Add or remove userId to a specific product when pressing dislike.
        if (type === 'add') {
            await fetch(dislikeLink(productId, userId, token), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userName)
            });
            dispatch({ type: 'SET_DISLIKED', isDisliked: true });
        }
        else {
            await fetch(dislikeLink(productId, userId, token), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            dispatch({ type: 'SET_DISLIKED', isDisliked: false });
        }

        // update the number of likes in the product object.
        await fetch(updateProductLink(productId, token), {
            method: 'PATCH',
            body: JSON.stringify({
                dislikes: numOfLikes
            })
        })

    };
};

export const fetchLikedUsers = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const productId = getState().reviews.currentProductId;

        const response = await fetch(fetchLikedUsersLink(productId, userId));

        const resData = await response.json();

        if (resData !== null) {
            dispatch({ type: "FETCH_LIKED", isLiked: true });
        }

        dispatch({ type: "FETCH_LIKED", isLiked: false });
    };

};

export const fetchDislikedUsers = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const productId = getState().reviews.currentProductId;

        const response = await fetch(fetchDislikedUsersLink(productId, userId));
        const resData = await response.json();

        if (resData !== null) {
            // response !null means that the current user has disliked the product.
            dispatch({ type: "FETCH_DISLIKED", isDisliked: true });
        }

        dispatch({ type: "FETCH_DISLIKED", isDisliked: false });
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