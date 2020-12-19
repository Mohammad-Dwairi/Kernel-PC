import React from 'react';
import { View } from 'react-native';
import AppText from './AppText';
import { emptyScreenTextStyle } from './Styles';

const EmptyScreenText = props => {
    const styles = emptyScreenTextStyle();
    return (
        <View style={styles.empty}>
            <AppText style={styles.emptyTextTitle}>{props.title}</AppText>
            <AppText style={styles.emptyText}>{props.message}</AppText>
        </View>
    );
};



export default EmptyScreenText;