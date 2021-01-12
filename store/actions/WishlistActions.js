import Product from '../../models/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToWishlistLink, removeFromWishlistLink, fetchWishlistKeysLink, fetchProductLink } from './firebaseLinks';
import { refreshExpiredToken } from './AuthActions';
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