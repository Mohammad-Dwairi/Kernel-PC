import Order from "../../models/Order";


const initialState = {
    orders: []
};

const OrdersReducer = (state=initialState, action) => {

    switch (action.type) {
        case 'ADD_ORDER':
            const order = new Order(action.id, action.cartItems, action.subtotal, action.taxes, action.shippingFees, action.totalPrice, action.totalQuantity, action.date);
            return {
                ...state,
                orders: state.orders.concat(order)
            };
        case 'LOAD_ORDERS':
            return {
                orders: action.orders
            };
    }

    return state;
};

export default OrdersReducer;