import Order from '../../models/Order';
import Product from '../../models/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        try {
            const response = await fetch(
                `https://kernel-ea898.firebaseio.com/products.json?orderBy="categoryId"&startAt="${categoryId}"&endAt="${categoryId}"`,
            );

            if (!response.ok) {
                throw new Error('Something went wrong when loading this category products, try again later');
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
        }
        catch (err) {
            throw new Error('Something went wrong when loading this category products, try again later');
        }

    };
};

export const fetchSpecialProducts = () => {
    return async dispatch => {

        const productIds = [];
        const products = [];

        // First: fetch Special product ids from firebase.
        try {
            const response = await fetch(`https://kernel-ea898.firebaseio.com/specialProducts.json`);
            const fetchedData = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong when loading special products.');
            }

            for (let key in fetchedData) {
                productIds.push(fetchedData[key]);
            }
        }
        catch (err) {
            console.log(err);
            throw new Error('Something went wrong when loading special products.');
        }

        //Second: fetch the products by their ids.
        try {
            for (let id of productIds) {
                const response = await fetch(`https://kernel-ea898.firebaseio.com/products/${id}.json`);
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
        }
        catch (err) {
            console.log(err);
            throw new Error('Something went wrong when setting special products.');
        }
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

        // Getting user token and id from AuthReducer.
        let token = getState().auth.token;
        const userId = getState().auth.userId;
        const userName = getState().auth.userName;
        const email = getState().auth.email;
        const refershToken = getState().auth.refershToken;
        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);
        // To store order's Date.
        const date = new Date();

        if (expiryDate <= new Date()) {
            dispatch(refreshExpiredToken(refershToken, email, userName));
            token = getState().auth.token;
        }

        // Iterate over cart Items to subtract each item quantity from the overall inStock quantity of the product. 
        cartItems.forEach(async item => {

            // Get the product by its id, (The cartItem id and product id are the same);
            try {
                const response = await fetch(`https://kernel-ea898.firebaseio.com/products/${item.id}.json`);
                const resData = await response.json();
                const inStock = resData.quantity;

                // PATCH request to update 'quantity' child of the product.
                await fetch(`https://kernel-ea898.firebaseio.com/products/${item.id}/.json?auth=${token}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ quantity: inStock - item.quantity })
                })
            }
            catch (err) {
                throw new Error('An Error occured when trying to add the order. try again later');
            }
        });

        // Adding the order to firebase
        try {
            const response = await fetch(`https://kernel-ea898.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
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
        }
        catch (err) {
            throw new Error('Something went wrong!');
        }
    };
};

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const loadedOrders = [];

        try {
            // fetch orders for the current user.
            const response = await fetch(`https://kernel-ea898.firebaseio.com/orders/${userId}.json`);
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
        }
        catch (err) {
            throw new Error('Something Went Wrong When Fetching Orders');
        }
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
        try {
            const response = await fetch(`https://kernel-ea898.firebaseio.com/wishlist/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product.id)
            });
            const resData = await response.json();
            console.log(resData);
            dispatch({
                type: 'ADD_TO_WISHLIST',
                product: { key: resData.name, product: product },
                //key: resData.name Add the product's id (given to it from the firebase) to the reducer in order
            })
        }
        catch (err) {
            console.log(err);
            //throw new Error('An Error occured when adding to wishlist, try again later.');
        }
    };
};

export const removeFromWishlist = (product, index) => {
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
        try {
            await fetch(`https://kernel-ea898.firebaseio.com/wishlist/${userId}/${productKey}.json?auth=${token}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            dispatch({
                type: 'REMOVE_FROM_WISHLIST',
                index: index
            });
        }
        catch (err) {
            console.log(err);
            throw new Error('An error occured when trying to remove the product from your wishlist, please try again later');
        }

    };
};

export const fetchWishlist = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const loadedProducts = [];
        //const keys = []; Store the products keys (given to them from firebase) to use them if the user wants to delete from wishlist.
        // See removeFromWishlist()

        try {
            const response = await fetch(`https://kernel-ea898.firebaseio.com/wishlist/${userId}.json`);
            const resData = await response.json();
            console.log('resss ', resData);
            for (const key in resData) {
                const productId = resData[key];
                console.log(productId);
                const productResponse = await fetch(`https://kernel-ea898.firebaseio.com/products/${productId}.json`);
                const product = await productResponse.json();
                console.log('product', product);
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

                    // new Product(
                    //     resData[key].id,
                    //     resData[key].categoryId,
                    //     resData[key].brand,
                    //     resData[key].model,
                    //     resData[key].price,
                    //     resData[key].color,
                    //     resData[key].images,
                    //     resData[key].quantity,
                    //     resData[key].description,
                    //     resData[key].likes,
                    //     resData[key].dislikes
                    // )
                );
            }
            dispatch({ type: 'LOAD_WISHLIST', products: loadedProducts })
        }
        catch (err) {
            console.log(err);
            //throw new Error('An error occured When loading the wishlist');
        }
    };
};

export const signup = (email, userName, password) => {
    return async dispatch => {

        // Sign up request
        const createUser = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
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
        const updateUserName = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
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
        const verifyEmail = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
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
        const login = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
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
        const user = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: loginData.idToken
            })
        });

        const userData = await user.json();

        if (userData.users[0].emailVerified) {
            const expirationTime = new Date(new Date().getTime() + parseInt(loginData.expiresIn) * 1000);
            dispatch({
                type: 'SIGNIN',
                isVerified: userData.users[0].emailVerified,
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
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken: token
            })
        });

        if (!response.ok){
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
    const login = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
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
    const verifyEmail = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
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
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        refreshToken: refreshToken,
        expirationTime: expirationTime.toISOString(),
    }))
};

export const refreshExpiredToken = (refreshToken) => {
    return async (dispatch, getState) => {
        const response = await fetch('https://securetoken.googleapis.com/v1/token?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
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

        console.log('refreshing', resData);
        console.log('Old refreshToken', refreshToken);
        console.log('New refreshToken', resData['refresh_token']);
        try {
            dispatch(authenticateUser(resData['id_token'], refreshToken, expirationTime));
        }
        catch(err) {
            throw new Error(err.message);
        }
    };

};

export const addReview = (review) => {
    return async (dispatch, getState) => {
        review.date = review.formattedDate;
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
        const response = await fetch(`https://kernel-ea898.firebaseio.com/reviews/${productId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(review)
        });
        dispatch({ type: 'ADD_REVIEW', review: review });
    };
};

export const fetchReviews = () => {
    return async (dispatch, getState) => {
        const productId = getState().reviews.currentProductId;
        console.log('pid', productId);
        const response = await fetch(`https://kernel-ea898.firebaseio.com/reviews/${productId}.json`);
        if (!response.ok) {
            console.log('something wrong');
        }
        const resData = await response.json();
        console.log(resData);
        let reviews = [];
        for (let key in resData) {
            reviews.push(resData[key]);
        }
        console.log('REVIEWS: ', reviews);
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
            await fetch(`https://kernel-ea898.firebaseio.com/likes/${productId}/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userName)
            });
            dispatch({type: 'SET_LIKED', isLiked: true});
        }
        else {
            await fetch(`https://kernel-ea898.firebaseio.com/likes/${productId}/${userId}.json?auth=${token}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            dispatch({type: 'SET_LIKED', isLiked: false});
        }

        await fetch(`https://kernel-ea898.firebaseio.com/products/${productId}/.json?auth=${token}`, {
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
            await fetch(`https://kernel-ea898.firebaseio.com/dislikes/${productId}/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userName)
            });
            dispatch({type: 'SET_DISLIKED', isDisliked: true});
        }
        else {
            await fetch(`https://kernel-ea898.firebaseio.com/dislikes/${productId}/${userId}.json?auth=${token}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            dispatch({type: 'SET_DISLIKED', isDisliked: false});
        }

        // update the number of likes in the product object.
        await fetch(`https://kernel-ea898.firebaseio.com/products/${productId}/.json?auth=${token}`, {
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

        const response = await fetch(`https://kernel-ea898.firebaseio.com/likes/${productId}/${userId}.json`);
        const resData = await response.json();
    
        if (resData !== null) {
            console.log("User does liked");
            dispatch({type: "FETCH_LIKED", isLiked: true});
        }
        dispatch({type: "FETCH_LIKED", isLiked: false});
    };
        
};

export const fetchDislikedUsers = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const productId = getState().reviews.currentProductId;
        const response = await fetch(`https://kernel-ea898.firebaseio.com/dislikes/${productId}/${userId}.json`);
        const resData = await response.json();
    
        if (resData !== null) {
            // response !null means that the current user disliked the product.
            dispatch({type: "FETCH_DISLIKED", isDisliked: true});
        }
        dispatch({type: "FETCH_DISLIKED", isDisliked: false});
    };  
};

export const changeUserName = (userName) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const expirationTime = getState().auth.expirationTime;
        const expiryDate = new Date(expirationTime);

        if (expiryDate <= new Date()) {
            const userData = await AsyncStorage.getItem('userData');
            const userDataObj = JSON.parse(userData);
            dispatch(refreshExpiredToken(userDataObj.refreshToken, userDataObj.email, userDataObj.userName));
            token = getState().auth.token;
        }

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAJpcnH04sJdXWJ986bb-DQ3O-O1ARn6q0', {
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
        if (response.ok) {
            console.log('DISPATCHING USER NAME')
            dispatch({ type: 'CHANGE_USER_NAME', userName: userName });
            console.log('Finish USER NAME')
        }

    };
}; 