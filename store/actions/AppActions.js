import AsyncStorage from '@react-native-async-storage/async-storage';

export const setDark = (value) => {
    try {
        AsyncStorage.setItem('darkMode', JSON.stringify({ darkMode: value }));
    } catch (error) {
        console.log(error);
    }
    return { type: 'SET_DARK', isDark: value };
};

export const saveDataToStorage = (token, refreshToken, expirationTime) => {
    // Data stored locally in the mobile storage. typically used to auto-login the user or request refresh token.
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        refreshToken: refreshToken,
        expirationTime: expirationTime.toISOString(),
    }))
};