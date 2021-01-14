import React, { useState } from 'react';
import { Image, ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import AppButton from '../components/SharedComponents/Atomic/AppButton';
import Input from '../components/UserSignupScreenComponents/Input';
import { COLORS } from '../constants/colors/colors';
import AppText from '../components/SharedComponents/Atomic/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/actions/AuthActions';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const UserSignupScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');


    const [username, setUsername] = useState('');


    const [password, setPassword] = useState('');


    const [assertionPassword, setAssertionPassword] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');

    const [address, setAddress] = useState('');


    const [isLoading, setIsLoading] = useState(false);

    const [inital, setInitial] = useState(true);

    const [errorText, setErrorText] = useState('');

    const validateEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return false;
        }
        else {
            return true;
        }
    };

    const validateUsername = () => {

        if (username.length < 3 || username.length > 25) {
            return true;
        }
        else if (username.trim() === '') {
            return true;
        }
        else if (/^\d+$/.test(username)) {
            // if full numric
            return true;
        }
        else if (!isNaN(username.charAt(0))) {
            // if starts with number
            return true;
        }
        else {
            for (let i = 0; i < username.length; i++) {
                let asci = username.charCodeAt(i);
                let char = username.charAt(i);
                if (char === ' ' || char === '-' || char === '_') {
                    continue;
                }
                if ((asci < 48) || (asci > 57 && asci < 65) || (asci > 90 && asci < 97) || (asci > 122)) {
                    return true;
                }
            }
            return false;
        }
    };

    const validatePassword = () => {
        if (/^(?=.*[0-9])(?=.*[A-Z])(?=.{5,})/.test(password)) {
            return false;
        }
        else {
            return true;
        }
    };

    const validateAssertionPassword = () => {
        if (password === assertionPassword) {
            return false;
        }
        else {
            return true;
        }
    };

    const submitHandler = () => {
        if (inital) {
            setInitial(false);
        }
        const hasError = validateEmail() || validateUsername() || validatePassword() || validateAssertionPassword();
        if (!hasError) {
            signupHandler();
        }
    };

    const signupHandler = async () => {
        try {
            setIsLoading(true);
            await dispatch(signup(email, username, password));
            navigation.navigate('Verification', { password: password, email: email, userName: username, phoneNumber: phoneNumber, address: address });
        }
        catch (err) {
            console.log(err);
            setIsLoading(false);
            setErrorText(err.message);
            //Alert.alert('Error', err.message);
        }

    };

    const darkMode = useSelector(state => state.darkMode.isDark);

    return (
        <ScrollView style={{ backgroundColor: darkMode ? COLORS.dark : COLORS.light }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Image style={{ width: 155, height: 47, marginVertical: 50 }} source={require('../assets/logo.png')} />
                <AppText style={{ color: 'crimson', textAlign: 'center' }}>{errorText}</AppText>
                <View style={styles.input}>
                    <AppText style={{ fontFamily: 'good-times' }}>Email</AppText>
                    <Input
                        icon='mail'
                        selectionColor={COLORS.primary}
                        placeholder='user@example.com'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        selectTextOnFocus={false}
                        maxLength={90}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    {validateEmail() && !inital ? <AppText style={{ alignSelf: 'center', color: 'crimson' }}>Invalid email address</AppText> : null}
                </View>

                <View style={styles.input}>
                    <AppText style={{ fontFamily: 'good-times' }}>UserName</AppText>
                    <Input
                        icon='user'
                        selectionColor={COLORS.primary}
                        placeholder='At least 4 Characters'
                        autoCapitalize='none'
                        selectTextOnFocus={false}
                        maxLength={90}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    {validateUsername() && !inital ? <AppText style={{ alignSelf: 'center', color: 'crimson' }}>Invalid User-Name</AppText> : null}
                </View>

                <View style={styles.input}>
                    <AppText style={{ fontFamily: 'good-times' }}>Phone Number</AppText>
                    <Input
                    icon='mobile'
                        selectionColor={COLORS.primary}
                        keyboardType='phone-pad'
                        autoCapitalize='none'
                        selectTextOnFocus={false}
                        maxLength={20}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                    />
                    {/* {validateEmail() && !inital ? <AppText style={{ alignSelf: 'center', color: 'crimson' }}>Invalid email address</AppText> : null} */}
                </View>

                <View style={styles.input}>
                    <AppText style={{ fontFamily: 'good-times' }}>Address</AppText>
                    <Input
                    icon='location-pin'
                        selectionColor={COLORS.primary}
                        placeholder='Country, City'
                        autoCapitalize='none'
                        selectTextOnFocus={false}
                        maxLength={50}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    {/* {validateEmail() && !inital ? <AppText style={{ alignSelf: 'center', color: 'crimson' }}>Invalid email address</AppText> : null} */}
                </View>

                <View style={styles.input}>
                    <AppText style={{ fontFamily: 'good-times' }}>Password</AppText>
                    <Input
                    icon='lock'
                        selectionColor={COLORS.primary}
                        autoCapitalize='none'
                        returnKeyType='next'
                        autoCorrect={false}
                        autoCompleteType='off'
                        maxLength={50}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {validatePassword() && !inital ?
                        <AppText style={{ alignSelf: 'center', color: 'crimson', textAlign: 'center' }}>
                            Your password must be at least 5 characters including numbers and capital letters.
                        </AppText> : null}
                </View>

                <View style={styles.input}>
                    <AppText style={{ fontFamily: 'good-times' }}>Confirm Password</AppText>
                    <Input
                    icon='lock'
                        selectionColor={COLORS.primary}
                        autoCapitalize='none'
                        returnKeyType='go'
                        maxLength={50}
                        secureTextEntry={true}
                        value={assertionPassword}
                        onChangeText={(text) => setAssertionPassword(text)}
                        onEndEditing={validateAssertionPassword}
                    />
                    {validateAssertionPassword() && !inital ?
                        <AppText style={{ alignSelf: 'center', color: 'crimson', textAlign: 'center' }}>
                            Passwords are not identical
                        </AppText> : null}
                </View>
                <AppButton style={{ width: '50%', marginBottom: 90 }} title='Signup' onPress={submitHandler}>
                    {isLoading ? <ActivityIndicator size='small' color={COLORS.accent} style={{ paddingRight: 15 }} /> : null}
                </AppButton>
                <KeyboardSpacer topSpacing={-50} />
            </View>
        </ScrollView>


    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 30,
        width: '80%'
    }
});

export default UserSignupScreen;