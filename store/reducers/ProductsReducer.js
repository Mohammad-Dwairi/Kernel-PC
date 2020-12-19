
const initialState = {
    products: [],
    specialProducts: []
};

const productReducer = (state=initialState, action) => {
    if (action.type === 'SET_PRODUCTS') {
        return {
            ...state,
            products: action.products
        };
    }
    else if (action.type === 'SET_SPECIAL_PRODUCTS') {
        return {
            ...state,
            specialProducts: action.specialProducts
        };
    }
    else if (action.type === 'LOGOUT') {
        return initialState;
    }
    return state;
};

export default productReducer;