import React, { useState } from 'react';
import { Image, ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import AppButton from '../components/SharedComponents/Atomic/AppButton';
import { COLORS } from '../constants/colors/colors';
import AppText from '../components/SharedComponents/Atomic/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/actions/AuthActions';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AppTextInput from '../components/SharedComponents/Atomic/AppTextInput';
import { validateEmail } from '../validation/EmailValidation';
import { validateUsername } from '../validation/UserNameValidation';
import { validateConfirmationPassword, validatePassword } from '../validation/PasswordValidation';
import Container from '../components/SharedComponents/Atomic/Container';
import ErrorText from '../components/SharedComponents/Atomic/ErrorText';

const UserSignupScreen = ({ route, navigation }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [userName, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [isLoading, setIsLoading] = useState(false);
    const [initial, setInitial] = useState(true);
    const [errorText, setErrorText] = useState('');

    const submitHandler = () => {
        if (initial) {
            setInitial(false);
        }
        const hasError = (
            !validateEmail(email)
            && !validateUsername(userName)
            && !validatePassword(password)
            && !validateConfirmationPassword(confirmPassword)
        );

        if (!hasError) {
            signupHandler();
        }
    };

    const signupHandler = async () => {
        try {
            setIsLoading(true);
            await dispatch(signup(email, userName, password));

            navigation.navigate(
                'Verification',
                {
                    password: password,
                    email: email,
                    userName: userName,
                    phoneNumber: phoneNumber,
                    address: address
                });
        }
        catch (err) {
            console.log(err);
            setIsLoading(false);
            setErrorText(err.message);
        }

    };

    return (
        <Container>
            <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>

                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <ErrorText>{errorText}</ErrorText>
                <View style={styles.form}>
                    <AppTextInput
                        label='Email'
                        icon='mail'
                        keyboardType='email-address'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize='none'
                        error={checkEmail(email, initial)}
                    />

                    <AppTextInput
                        label='Username'
                        icon='user'
                        value={userName}
                        onChangeText={text => setUsername(text)}
                        autoCapitalize='none'
                        error={checkUserName(userName, initial)}
                    />

                    <AppTextInput
                        label='Phone Number'
                        icon='mobile'
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        autoCapitalize='none'
                    />

                    <AppTextInput
                        label='Address'
                        icon='location-pin'
                        value={address}
                        onChangeText={text => setAddress(text)}
                        autoCapitalize='none'
                    />

                    <AppTextInput
                        label='Password'
                        icon='lock'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                        error={checkPassword(password, initial)}
                    />

                    <AppTextInput
                        label='Confirm Password'
                        icon='lock'
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry={true}
                        error={checkConfirmPassword(password, confirmPassword, initial)}
                    />

                    <AppButton style={{ width: '50%', marginTop: 20 }} title='Signup' onPress={submitHandler}>
                        {isLoading ? <ActivityIndicator size='small' color={COLORS.accent} style={{ paddingRight: 15 }} /> : null}
                    </AppButton>
                </View>


                <KeyboardSpacer />

            </ScrollView>
        </Container>
    );
};

const checkEmail = (email, initial) => {
    if (!validateEmail(email) && !initial) {
        return 'Invalid email address';
    }
    return null;
};

const checkUserName = (userName, initial) => {
    if (!validateUsername(userName) && !initial) {
        return 'Invalid User-Name';
    }
    return null;
};

const checkPassword = (password, initial) => {
    if (!validatePassword(password) && !initial) {
        return 'Password must be at least 5 characters including capital letters and numbers';
    }
    return null;
};

const checkConfirmPassword = (password, confirmPassword, initial) => {
    if (!validateConfirmationPassword(password, confirmPassword) && !initial) {
        return 'Passwords do not match';
    }
    return null;
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        paddingHorizontal: 20
    },
    logo: {
        width: 185,
        height: 55,
        marginVertical: 30,
        marginLeft: 20,
        alignSelf: 'center'
    }
});
export default UserSignupScreen;