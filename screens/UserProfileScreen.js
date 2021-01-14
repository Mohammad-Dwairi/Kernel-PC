import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Container from '../components/SharedComponents/Atomic/Container';
import { useDispatch, useSelector } from 'react-redux';
import UserNameCard from '../components/UserProfileScreenComponents/UserNameCard';
import UserInfoRow from '../components/UserProfileScreenComponents/UserInfoRow';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AppButton from '../components/SharedComponents/Atomic/AppButton';
import AppText from '../components/SharedComponents/Atomic/AppText';
import { COLORS } from '../constants/colors/colors';
import { addAddress, addPhoneNumber, changeAddress, changeEmail, changePhoneNumber, setUserInfo } from '../store/actions/UserActions';
import { useEffect } from 'react/cjs/react.development';


const ApplyButton = props => {

    const [isLoading, setIsLoading] = useState(false);
    let button = null;

    if (props.value.trim() === props.inputText.trim()) {
        return null;
    }
    if (isLoading) {
        button = <ActivityIndicator color={COLORS.primary} size='small' style={{ alignSelf: 'flex-end' }} />;
    }
    else {
        button = (
            <AppText style={{ fontFamily: 'good-times', color: COLORS.primary, padding: 5, textAlign: 'right', margin: 10 }}>
                Apply
            </AppText>
        );
    }
    return (
        <TouchableOpacity onPress={props.applyAction} disabled={isLoading}>
            {button}
        </TouchableOpacity>
    );
};


const UserProfileScreen = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const userName = useSelector(state => state.auth.userName);
    const email = useSelector(state => state.auth.email);

    const phoneNumber = useSelector(state => state.user.phoneNumber);
    const address = useSelector(state => state.user.address);

    const [phoneNumberInput, setPhoneNumberInput] = useState(phoneNumber);
    const [addressInput, setAddressInput] = useState(address);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Profile',
        });
    }, [navigation, route]);

    return (
        <Container>
            <ScrollView >
                <UserNameCard userName={userName} />
                <UserInfoRow label='Email' value={email} icon='email' />
                <View>
                    <UserInfoRow label='Phone Number' value={phoneNumber} icon='mobile' onChangeText={text => setPhoneNumberInput(text)} />
                    <ApplyButton value={phoneNumber} inputText={phoneNumberInput} 
                        applyAction={() => (phoneNumber === '' && address === '') ? dispatch(addPhoneNumber(phoneNumberInput)) : dispatch(changePhoneNumber(phoneNumberInput))} />
                </View>
                <View>
                    <UserInfoRow label='Address' value={address} icon='map' onChangeText={text => setAddressInput(text)} />
                    <ApplyButton value={address} inputText={addressInput} 
                        applyAction={() => (phoneNumber === '' && address === '') ? dispatch(addAddress(addressInput)) : dispatch(changeAddress(addressInput))} />
                </View>

                {/* <AppButton title='change password' style={{ width: '50%', marginTop: 20, alignSelf: 'center' }}></AppButton>
                <AppButton title='delete account' style={{ width: '50%', marginTop: 20, marginBottom: 30, alignSelf: 'center' }}></AppButton> */}
                <KeyboardSpacer />
            </ScrollView>
        </Container>
    );
};


export default UserProfileScreen;