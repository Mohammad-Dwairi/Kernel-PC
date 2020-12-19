const initialState = {
    products: [],
};

const WishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            return {
                products: state.products.concat(action.product),
            };
        case 'REMOVE_FROM_WISHLIST':
            if (action.index > -1) {
                let updatedProducts = [...state.products];
                updatedProducts.splice(action.index, 1);
                return {
                    products: updatedProducts
                };
            }
        case 'LOAD_WISHLIST':
            return {
                products: action.products,
            };
        default: return state;
    }
};

export default WishlistReducer;