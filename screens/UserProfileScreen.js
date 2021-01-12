import React, { useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Container from '../components/SharedComponents/Atomic/Container';
import AppText from '../components/SharedComponents/Atomic/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../constants/colors/colors';
import { Entypo } from '@expo/vector-icons';
import { changeUserName } from '../store/actions/AuthActions';
const UserProfileScreen = ({ route, navigation }) => {
    const userName = useSelector(state => state.auth.userName);
    const email = useSelector(state => state.auth.email);
    const darkMode = useSelector(state => state.darkMode.isDark);

    const [currentUserName, setCurrentUserName] = useState(userName);
    const [guideText, setGuideText] = useState('Press on your name if you want to change it.');
    const [isLoading, setIsLoading] = useState(false);
    const styles = StyleSheet.create({
        userNameContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 50,
            padding: 30,
            width: '100%',
            alignItems: 'center',
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            marginBottom: 20
        },
        userNameText: {
            color: COLORS.primary,
            fontSize: 20,
            fontFamily: 'open-sans-b',
        },
        symbolContainer: {
            backgroundColor: darkMode ? COLORS.accent : COLORS.light,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            marginHorizontal: 15
        },
        symbol: {
            color: COLORS.primary,
            fontSize: 25,
            fontFamily: 'good-times',
        },
        row: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            marginBottom: 20,
            width: '100%',
            padding: 10,
            paddingRight: 50
        },
        label: {
            fontFamily: 'good-times',
            color: COLORS.primary,
        },
        buttonsContainer: {
            flexDirection: 'row'
        }
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Profile',
        });
    }, [navigation, route]);

    const validateUsername = () => {

        if (currentUserName.length < 3 || currentUserName.length > 25) {
            return true;
        }
        else if (currentUserName.trim() === '') {
            return true;
        }
        else if (/^\d+$/.test(currentUserName)) {
            // if full numric
            return true;
        }
        else if (!isNaN(currentUserName.charAt(0))) {
            // if starts with number
            return true;
        }
        else {
            for (let i = 0; i < currentUserName.length; i++) {
                let asci = currentUserName.charCodeAt(i);
                let char = currentUserName.charAt(i);
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

    const dispatch = useDispatch();

    const changeUserNameHandler = () => {
        setGuideText('Press on your name if you want to change it.');
        setIsLoading(true);
        dispatch(changeUserName(currentUserName));
        setIsLoading(false);
    };

    return (
        <Container style={{ paddingTop: 30 }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                <Image style={{ width: 155, height: 47, marginVertical: 50 }} source={require('../assets/logo.png')} />
                <View style={styles.userNameContainer}>
                    <View style={styles.symbolContainer}>
                        <AppText style={styles.symbol}>{userName.charAt(0)}</AppText>
                    </View>
                    <View style={{ flex: 4 }}>
                        <TextInput
                            defaultValue={userName}
                            style={styles.userNameText}
                            onChangeText={(text) => setCurrentUserName(text)}
                            maxLength={25}
                        />
                        <AppText style={{ fontSize: 11 }}>{guideText}</AppText>
                        {
                            currentUserName.trim() === userName.trim() ?
                                null :
                                <TouchableOpacity onPress={() => validateUsername() ? setGuideText('Invalid User Name') : changeUserNameHandler()} disabled={isLoading}>
                                    {
                                        isLoading ? <ActivityIndicator color={COLORS.primary} size='small' style={{ alignSelf: 'flex-end' }} /> :
                                            <AppText style={{ fontFamily: 'good-times', color: COLORS.primary, padding: 5, textAlign: 'right' }}>
                                                Apply
                                            </AppText>
                                    }

                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo name='email' size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
                        <AppText style={styles.label}>Email </AppText>
                    </View>

                    <AppText style={{ fontFamily: 'open-sans-b' }}>{email}</AppText>
                </View>
            </ScrollView>
        </Container>
    );


};



export default UserProfileScreen;