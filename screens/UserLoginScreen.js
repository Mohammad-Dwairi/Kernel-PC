import React, { useState } from 'react';
import { Image, ScrollView, KeyboardAvoidingView, View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AppButton from '../components/SharedComponents/Atomic/AppButton';
import Input from '../components/UserSignupScreenComponents/Input';
import { COLORS } from '../constants/colors/colors';
import AppText from '../components/SharedComponents/Atomic/AppText';
import Container from '../components/SharedComponents/Atomic/Container';
import { login } from '../store/actions/AuthActions';
import { useDispatch } from 'react-redux';

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
            //navigation.navigate('App');

        }
        catch (err) {
            console.log(err);
            setIsLoading(false);
            if (err.message === 'Email is not verified') {
                navigation.navigate('Signup', { screen: 'Verification', params: { email: email, password: password } })
            }
            else {
                setErrorText(err.message);
                //Alert.alert(err.message, null, [{text: 'Try Again', style: 'destructive'}])
            }
        }

    };

    return (
        <Container>
            <ScrollView>
                <KeyboardAvoidingView behavior='position'>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image style={{ width: 155, height: 47, marginVertical: 50 }} source={require('../assets/logo.png')} />
                        <AppText style={{ color: 'crimson' }}>{errorText}</AppText>
                        <View style={styles.input}>
                            <AppText style={{ fontFamily: 'good-times' }}>Email</AppText>
                            <Input
                            icon='mail'
                                selectionColor={COLORS.primary}
                                //placeholder='Email'
                                keyboardType='email-address'
                                autoCapitalize='none'
                                maxLength={90}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View style={styles.input}>
                            <AppText style={{ fontFamily: 'good-times' }}>Password</AppText>
                            <Input
                                icon='lock'
                                selectionColor={COLORS.primary}
                                //placeholder='Password'
                                autoCapitalize='none'
                                maxLength={50}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                        </View>

                        <AppButton style={{ width: '50%' }} title='Login' onPress={loginHandler}>
                            {isLoading ? <ActivityIndicator size='small' color={COLORS.light} style={{ marginRight: 15 }} /> : null}
                        </AppButton>

                        <Text style={{ marginTop: 40, color: 'gray' }}>Not A Member Yet?</Text>
                        <Text style={{ color: 'gray' }}>Swipe Left To Signup!</Text>

                    </View>

                </KeyboardAvoidingView>

            </ScrollView>
        </Container>

    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 30,
        width: '80%'
    }
});

export default UserLoginScreen;