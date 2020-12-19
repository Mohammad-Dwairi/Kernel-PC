const initialState = {
    currentProductId: null,
    reviews: []
};

const ReviewsReducer = (state = initialState, action) => {
    if (action.type === 'ADD_REVIEW') {
        const updatedReviews = [...state.reviews];
        updatedReviews.push(action.review);
        return { ...state, reviews: updatedReviews}
    }
    else if (action.type === 'SET_PRODUCT') {
        return { ...state, currentProductId: action.id }
    }
    else if (action.type === 'LOAD_REVIEWS') {
        return { ...state, reviews: action.reviews }
    }
    return state;
};

export default ReviewsReducer;