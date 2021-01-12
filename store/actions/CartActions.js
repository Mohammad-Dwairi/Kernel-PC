

export const addToCart = product => {
    return { type: 'ADD_TO_CART', product: product };
};

export const increaseQuantity = (index) => {
    return { type: 'INCREASE_QAUNTITY', index: index };
};

export const decreaseQuantity = (index) => {
    return { type: 'DECREASE_QAUNTITY', index: index };
};