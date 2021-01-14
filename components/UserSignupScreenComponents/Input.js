import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants/colors/colors';
import { inputStyles } from './Styles';

const Input = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = inputStyles(darkMode);


    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Entypo name={props.icon} size={18} color={COLORS.primary}/>
            <TextInput
                {...props}
                style={styles.input}
                placeholderTextColor={darkMode ? 'gray' : 'lightgray'}
            />
        </View>
    );
};

export default Input;