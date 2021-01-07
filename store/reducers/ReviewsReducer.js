const initialState = {
    currentProductId: null,
    isLiked: false,
    isDisliked: false,
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
    else if (action.type === 'FETCH_LIKED') {
        return {...state, isLiked: action.isLiked};
    }
    else if (action.type === 'FETCH_DISLIKED') {
        return {...state, isDisliked: action.isDisliked};
    }
    else if (action.type === 'SET_LIKED') {
        return {...state, isLiked: action.isLiked};
    }
    else if (action.type === 'SET_DISLIKED') {
        return {...state, isDisliked: action.isDisliked};
    }
    return state;
};

export default ReviewsReducer;