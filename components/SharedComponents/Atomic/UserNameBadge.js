import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../constants/colors/colors';
import AppText from './AppText';

const UserNameBadge = props => {

    const userName = useSelector(state => state.auth.userName);
    const darkMode = useSelector(state => state.darkMode.isDark);

    const styles = StyleSheet.create({
        container: {
            height: 30,
            width: 30,
            borderRadius: 15,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontFamily: 'good-times',
            color: COLORS.light,
            padding: 0,
            margin: 0
        }
    });
    return (
        <TouchableOpacity style={styles.container} {...props}>
            <AppText style={styles.text}>{userName.charAt(0)}</AppText>
        </TouchableOpacity>
    );
};

export default UserNameBadge;