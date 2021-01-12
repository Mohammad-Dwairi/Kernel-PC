import Order from '../../models/Order';
import { fetchProductLink, updateProductLink, addOrderLink, fetchOrdersLink } from './firebaseLinks';
import { refreshExpiredToken } from './AuthActions';

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
