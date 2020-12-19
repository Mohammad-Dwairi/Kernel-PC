import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import AppText from './AppText';
import { appButtonStyle } from './Styles';

const AppButton = props => {
    const styles = appButtonStyle();
    return (
        <View style={{ ...styles.btnContainer, ...props.style }}>
            <TouchableOpacity style={styles.button} onPress={props.onPress} >
                <AppText style={styles.text}>{props.title}</AppText>
                {props.children}
            </TouchableOpacity>
        </View>
    );
};

export default AppButton;