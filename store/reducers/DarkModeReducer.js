
const initialState = {
    isDark: false
}

const darkMode = (state=initialState, action) => {
    if (action.type === 'SET_DARK') {
        return {isDark: action.isDark}
    }
    return state;
};

export default darkMode;