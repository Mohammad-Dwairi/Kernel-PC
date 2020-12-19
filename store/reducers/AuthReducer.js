const initialState = {
    isLoggedIn: false,
    isStartup: true,
    token: '',
    refreshToken: '',
    expirationTime: '',
    userId: '',
    email: '',
    userName: ''
};

const AuthReducer = (state = initialState, action) => {
    if (action.type === 'SIGNIN') {
        return { 
            isLoggedIn: action.isVerified,
            isStartup: false,
            token: action.token,
            refreshToken: action.refreshToken,
            expirationTime: action.expirationTime,
            userId: action.userId,
            email: action.email,
            userName: action.userName
        };
    }
    else if (action.type === 'LOGOUT') {
        return { ...initialState, isStartup: false };
    }
    else if (action.type === 'CHANGE_USER_NAME') {
        return {
            ...state,
            userName: action.userName
        };
    }
    else if (action.type === 'AUTHENTICATE') {
        return {
            isLoggedIn: true,
            isStartup: false,
            token: action.token,
            refreshToken: action.refreshToken,
            expirationTime: action.expirationTime,
            userId: action.userId,
            email: action.email,
            userName: action.userName
        };
    }
    else if (action.type === 'NOT_AUTHENTICATED') {
        return {
            ...initialState,
            isStartup: false
        };
    }
    return state;
};

export default AuthReducer;