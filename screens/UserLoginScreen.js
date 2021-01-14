import React, { useState } from 'react';
import { Image, ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AppButton from '../components/SharedComponents/Atomic/AppButton';
import { COLORS } from '../constants/colors/colors';
import Container from '../components/SharedComponents/Atomic/Container';
import { login } from '../store/actions/AuthActions';
import { useDispatch } from 'react-redux';
import AppTextInput from '../components/SharedComponents/Atomic/AppTextInput';
import ErrorText from '../components/SharedComponents/Atomic/ErrorText';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const UserLoginScreen = ({ route, navigation }) => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorText, setErrorText] = useState('');

    const loginHandler = async () => {
        try {
            setIsLoading(true);
            await dispatch(login(email, password));
        }
        catch (err) {
            console.log(err);
            setIsLoading(false);
            if (err.message === 'Email is not verified') {
                navigation.navigate('Signup', { screen: 'Verification', params: { email: email, password: password } })
            }
            else {
                setErrorText(err.message);
            }
        }
    };

    return (
        <Container>
            <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                <View style={styles.form}>
                    <AppTextInput
                        label='Email'
                        icon='mail'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                    <AppTextInput
                        label='Password'
                        icon='lock'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={true}
                    />
                    <ErrorText>{errorText}</ErrorText>
                    <AppButton style={styles.loginBtn} title='Login' onPress={loginHandler}>
                        {isLoading ? <ActivityIndicator size='small' color={COLORS.light} style={styles.loadingLogin} /> : null}
                    </AppButton>
                </View>
                <View style={styles.hintContianer}>
                    <Text style={styles.hintText}>Not A Member Yet?</Text>
                    <Text style={styles.hintText}>Swipe Left To Signup!</Text>
                </View>
                <KeyboardSpacer />
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 1 },
        paddingHorizontal: 20
    },
    loginBtn: {
        width: '50%'
    },
    loadingLogin: {
        paddingRight: 5
    },
    hintContianer: {
        alignSelf: 'center'
    },
    hintText: {
        color: 'gray',
        fontSize: 12
    },
    logo: {
        width: 185,
        height: 55,
        marginVertical: 30,
        marginLeft: 20,
        alignSelf: 'center'
    }
});

export default UserLoginScreen;