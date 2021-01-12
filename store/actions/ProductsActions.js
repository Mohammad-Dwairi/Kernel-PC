import Product from '../../models/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshExpiredToken } from './AuthActions';
import {
    fetchProductsLink,
    fetchSpecialProductsIdsLink,
    fetchProductLink,
    fetchLikedProductsLink,
    fetchDislikedProductsLink,
    likeLink,
    unLikeLink,
    updateProductLink,
    dislikeLink,
    unDislikeLink,
    addReviewLink,
    fetchReviewsLink

} from './firebaseLinks';

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

export const fetchLikedProducts = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;


        const response = await fetch(fetchLikedProductsLink(userId));

        const resData = await response.json();

        const likedProducts = [];
        for (const key in resData) {
            likedProducts.push({ firebaseKey: key, productId: resData[key].productId });
        }

        dispatch({ type: 'SET_LIKED_PRODUCTS', likedProducts: likedProducts });
    };

};

export const fetchDislikedProducts = () => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;

        const response = await fetch(fetchDislikedProductsLink(userId));

        const resData = await response.json();

        const dislikedProducts = [];
        for (const key in resData) {
            dislikedProducts.push({ firebaseKey: key, productId: resData[key].productId });
        }

        dispatch({ type: 'SET_DISLIKED_PRODUCTS', dislikedProducts: dislikedProducts });
    };
};

export const like = (numOfLikes, type, firebaseKey) => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const productId = getState().reviews.currentProductId; //remove

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
            const response = await fetch(likeLink(token), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    userId: userId,
                    userName: userName
                })
            });
            const resData = await response.json();
            console.log("@@@@22", resData);
            const firebaseKey = resData.name;
            dispatch({ type: 'ADD_LIKED_PRODUCT', likedProduct: { firebaseKey: firebaseKey, productId: productId } });
        }
        else {
            await fetch(unLikeLink(firebaseKey, token), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            dispatch({ type: 'REMOVE_LIKED_PRODUCT', productId: productId });
        }

        await fetch(updateProductLink(productId, token), {
            method: 'PATCH',
            body: JSON.stringify({
                likes: numOfLikes
            })
        })

    };
};

export const dislike = (numOfDislikes, type, firebaseKey) => {
    return async (dispatch, getState) => {

        const userId = getState().auth.userId;
        const productId = getState().reviews.currentProductId; //remove

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
            const response = await fetch(dislikeLink(token), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productId: productId,
                    userId: userId,
                    userName: userName
                })
            });
            const resData = await response.json();
            console.log("@@@@22", resData);
            const firebaseKey = resData.name;
            dispatch({ type: 'ADD_DISLIKED_PRODUCT', dislikedProduct: { firebaseKey: firebaseKey, productId: productId } });
        }
        else {
            await fetch(unDislikeLink(firebaseKey, token), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            dispatch({ type: 'REMOVE_DISLIKED_PRODUCT', productId: productId });
        }

        await fetch(updateProductLink(productId, token), {
            method: 'PATCH',
            body: JSON.stringify({
                likes: numOfDislikes
            })
        })
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