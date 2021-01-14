import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import AppButton from '../components/SharedComponents/Atomic/AppButton';
import AppText from '../components/SharedComponents/Atomic/AppText';
import Container from '../components/SharedComponents/Atomic/Container';
import { COLORS } from '../constants/colors/colors';
import { login, resendVerificationLink } from '../store/actions/AuthActions';
import { uploadUserInfo } from '../store/actions/UserActions';
const EmailNotVerifiedScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(false);

    const email = route.params.email;
    const password = route.params.password;
    const userName = route.params.userName;
    const phoneNumber = route.params.phoneNumber;
    const address = route.params.address;

    const dispatch = useDispatch();

    const verifyEmailHandler = async () => {
        try {
            setIsLoading(true);
            await dispatch(login(email, password));
            await dispatch(uploadUserInfo(userName, phoneNumber, address));
        }
        catch (err) {
            setIsLoading(false);
            Alert.alert(err.message, 'Do you want to resend verification link?',
                [{ text: 'Resend', style: 'default', onPress: () => resendVerificationLink(email, password) },
                { text: 'Cancel', style: 'destructive' }]);
        }

    };

    if (isLoading) {
        return (
            <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color={COLORS.primary} size='large' />
            </Container>
        );
    }

    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <AppText style={styles.text}>Please check your email for verification</AppText>
            <AppText>Click continue once you are done!</AppText>
            <AppButton title='Continue' style={styles.button} onPress={verifyEmailHandler} />
        </Container>
    );
};

const styles = StyleSheet.create({
    text: {
        color: COLORS.primary,
        fontSize: 20,
        fontFamily: 'open-sans-b',
        textAlign: 'center',
        padding: 10
    },
    button: {
        width: '60%',
        paddingTop: 20
    }
});

export default EmailNotVerifiedScreen;