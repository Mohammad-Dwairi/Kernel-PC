import React from 'react';
import { userInfoRowStyles } from './Styles';
import { View } from 'react-native';
import AppText from '../SharedComponents/Atomic/AppText';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import KeyboardSpacer from 'react-native-keyboard-spacer';

const UserInfoRow = props => {
    const styles = userInfoRowStyles();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Entypo name={props.icon} size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
                <AppText style={styles.label}>{props.label} </AppText>
            </View>
            <TextInput 
                style={{ fontFamily: 'open-sans-r', marginLeft: 25 }}
                defaultValue={props.value}
            />
        </View>
    );
};

export default UserInfoRow;