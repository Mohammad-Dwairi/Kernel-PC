
const initialState = {
    products: [],
    specialProducts: [],
    likedProducts: [],
    dislikedProducts: []
};

const productReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.products };

        case 'SET_SPECIAL_PRODUCTS':
            return { ...state, specialProducts: action.specialProducts };

        case 'SET_LIKED_PRODUCTS':
            console.log("LIKED ", action.likedProducts);
            return { ...state, likedProducts: action.likedProducts };

        case 'ADD_LIKED_PRODUCT':
            console.log("ADD LIKED", action.likedProduct);
            return { ...state, likedProducts: [...state.likedProducts, action.likedProduct] };

        case 'REMOVE_LIKED_PRODUCT':
            console.log("REMOVE LIKED", action.productId);
            const updatedLikedProducts = [...state.likedProducts];
            const likedIndex = updatedLikedProducts.findIndex(product => product.productId === action.productId);
            updatedLikedProducts.splice(likedIndex, 1);
            return { ...state, likedProducts: updatedLikedProducts };

        case 'ADD_DISLIKED_PRODUCT':
            console.log("ADD DISLIKED", action.dislikedProduct);
            return { ...state, dislikedProducts: [...state.dislikedProducts, action.dislikedProduct] };

        case 'SET_DISLIKED_PRODUCTS':
            console.log("DISLIKED ", action.dislikedProducts);
            return { ...state, dislikedProducts: action.dislikedProducts };

        case 'REMOVE_DISLIKED_PRODUCT':
            console.log("REMOVE DISLIKED", action.productId);
            const updatedDislikedProducts = [...state.dislikedProducts];
            const dislikedIndex = updatedDislikedProducts.findIndex(product => product.productId === action.productId);
            updatedDislikedProducts.splice(dislikedIndex, 1);
            return { ...state, dislikedProducts: updatedDislikedProducts };

        case 'LOGOUT':
            return initialState;
    }

    return state;
};

export default productReducer;