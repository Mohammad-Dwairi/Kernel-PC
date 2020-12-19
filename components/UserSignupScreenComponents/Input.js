import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants/colors/colors';
import { inputStyles } from './Styles';

const Input = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = inputStyles(darkMode);
    

    return (

        <TextInput
            {...props}
            style={styles.input}
            placeholderTextColor={darkMode ? 'gray' : COLORS.text}
        />


    );
};

export default Input;