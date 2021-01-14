import React from 'react';
import { userInfoRowStyles } from './Styles';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import AppText from '../SharedComponents/Atomic/AppText';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors/colors';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const UserInfoRow = props => {
    const styles = userInfoRowStyles();
    const darkMode = useSelector(state => state.darkMode.isDark);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Entypo name={props.icon} size={20} color={COLORS.primary} style={{ marginRight: 5 }} />
                <AppText style={styles.label}>{props.label} </AppText>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                {
                    props.label === 'Email' ? null :
                        <FontAwesome name='edit' size={20} color={COLORS.text} style={{ alignItems: 'center', justifyContent: 'center', padding: 5 }} />
                }

                <TextInput
                    editable={props.label !== 'Email'}
                    style={{ fontFamily: 'open-sans-m', marginLeft: 25, width: '100%', padding: 5, color: darkMode ? COLORS.accent : COLORS.text }}
                    placeholder={props.label === 'Phone Number' ? 'Add a phone number' : 'Add your address'}
                    keyboardType={props.label === 'Phone Number' ? 'phone-pad' : 'default'}
                    placeholderTextColor={COLORS.accent}
                    defaultValue={props.value}
                    onChangeText={props.onChangeText}
                />

            </View>

        </View>
    );
};

export default UserInfoRow;