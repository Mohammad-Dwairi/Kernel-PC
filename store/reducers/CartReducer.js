import CartItem from '../../models/CartItem';

const initialState = {
    cart: [],
    quantityTotal: 0
};

const CartReducer = (state = initialState, action) => {
    let updatedCart;

    switch (action.type) {
        case 'ADD_TO_CART':
            const product = action.product;
            updatedCart = [...state.cart];
            const index = updatedCart.findIndex(cart => cart.id === product.id);
            if (index > -1) {
                const quantity = updatedCart[index].quantity;
                updatedCart.splice(index, 1);
                return {
                    cart: updatedCart,
                    quantityTotal: state.quantityTotal - quantity
                };
            }
            const item = new CartItem(product.id, product.categoryId, product.brand, product.model, 1, product.images[0], product.price, product.quantity);
            console.log(item);
            return {
                cart: state.cart.concat(item),
                quantityTotal: state.quantityTotal + 1
            };

        case 'INCREASE_QAUNTITY':
            updatedCart = [...state.cart];
            updatedCart[action.index].quantity++;
            return {
                cart: updatedCart,
                quantityTotal: state.quantityTotal + 1
            };
            
        case 'DECREASE_QAUNTITY':
            const i = action.index;
            updatedCart = [...state.cart];
            if (updatedCart[i].quantity === 1) {
                updatedCart.splice(i, 1);
            }
            else {
                updatedCart[i].quantity--;
            }
            return {
                cart: updatedCart,
                quantityTotal: state.quantityTotal - 1
                //quantityTotal: updatedCart.length
            };

        case 'ADD_ORDER' || 'LOGOUT':
            return initialState;


        default: return state;
    }
};

export default CartReducer;