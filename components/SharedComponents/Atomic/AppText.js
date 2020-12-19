import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { appTextStyle } from './Styles';

const AppText = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = appTextStyle(darkMode);
    
    return (
        <Text style={{ ...styles.text, ...props.style }}>
            {props.children}
        </Text>

    );
};

export default AppText;