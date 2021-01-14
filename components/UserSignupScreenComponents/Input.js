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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Entypo name={props.icon} size={20} color={COLORS.primary} style={{marginRight: 10}}/>
            
            <TextInput
                {...props}
                style={styles.input}
                placeholderTextColor={darkMode ? 'gray' : 'lightgray'}
                
            />
            
        </View>
    );
};

export default Input;