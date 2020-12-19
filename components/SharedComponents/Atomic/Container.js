import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { containerStyle } from './Styles';

const Container = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = containerStyle(darkMode);
    return (
        <View style={{ ...styles.container, ...props.style }}>
        <StatusBar style={darkMode ? 'light' : 'dark'} />
            {props.children}
        </View>
    );
};

export default React.memo(Container);