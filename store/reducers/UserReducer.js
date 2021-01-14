
const initialState = {
    userId: '',
    email: '',
    userName: '',
    phoneNumber: '',
    address: ''
};

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_USER':
            console.log(action);
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                userName: action.userName,
                phoneNumber: action.phoneNumber,
                address: action.address
            };
        case 'CHANGE_PHONE_NUMBER':
            console.log(action.phoneNumber);
            return {
                ...state,
                phoneNumber: action.phoneNumber
            };
        case 'CHANGE_ADDRESS':
            console.log(action.address);
            return {
                ...state,
                address: action.address
            };
        case 'LOGOUT':
            return initialState;
    }

    return state;
};

export default UserReducer;