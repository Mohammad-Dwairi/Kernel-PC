import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import Container from '../components/SharedComponents/Atomic/Container';
import { useSelector } from 'react-redux';
import UserNameCard from '../components/UserProfileScreenComponents/UserNameCard';
import UserInfoRow from '../components/UserProfileScreenComponents/UserInfoRow';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const UserProfileScreen = ({ route, navigation }) => {


    const userName = useSelector(state => state.auth.userName);
    const email = useSelector(state => state.auth.email);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Profile',
        });
    }, [navigation, route]);

    return (
        <Container>
            <ScrollView bounces={false}>
                <UserNameCard userName={userName} />
                <UserInfoRow label='Email' value={email} icon='email' />
                <UserInfoRow label='Phone Number' value='* Add phone number' icon='mobile' />
                <UserInfoRow label='Address' value='* Add your address' icon='map' />
                <KeyboardSpacer />
            </ScrollView>
        </Container>
    );
};


export default UserProfileScreen;