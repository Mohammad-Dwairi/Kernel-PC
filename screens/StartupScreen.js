import React, { useEffect } from 'react';
import Container from '../components/SharedComponents/Atomic/Container';
import { ActivityIndicator, Alert } from 'react-native';
import { COLORS } from '../constants/colors/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { authenticateUser, refreshExpiredToken } from '../store/actions/actions';

const StartupScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            try {
                const dark = await AsyncStorage.getItem('darkMode');
                const darkObj = JSON.parse(dark);
                console.log(darkObj.darkMode);
                dispatch({ type: 'SET_DARK', isDark: darkObj.darkMode });
            }
            catch (err) {
                console.log(err);
            }

            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                dispatch({ type: 'NOT_AUTHENTICATED' });
                navigation.navigate('AuthScreen');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, refreshToken, expirationTime } = transformedData;
            const expiryDate = new Date(expirationTime);
            console.log('Transformed Data', transformedData);

            if (expiryDate <= new Date()) {
                //dispatch({ type: 'NOT_AUTHENTICATED' });
                //navigation.navigate('AuthScreen');
                try {
                    dispatch(refreshExpiredToken(refreshToken));
                }
                catch (err) {
                    Alert.alert(err.message, null, [{ text: 'OK' }]);
                    navigation.navigate('AuthScreen');
                }
                return;
            }
            try {
                await dispatch(authenticateUser(token, refreshToken, expirationTime));
                navigation.navigate('App');
            }
            catch (err) {
                Alert.alert(err.message, null, [{ text: 'OK' }]);
                navigation.navigate('AuthScreen');
                AsyncStorage.removeItem('userData');
            }
            //dispatch({ type: 'AUTHENTICATE', token: token, userId: userId, email: email, userName: userName, expirationTime: expirationTime });

        };
        tryLogin();
    }, []);
    return (
        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color={COLORS.primary} />
        </Container>
    );
};

export default StartupScreen;