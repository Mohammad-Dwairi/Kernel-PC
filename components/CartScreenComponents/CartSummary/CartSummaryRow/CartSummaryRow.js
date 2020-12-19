import React from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/colors/colors';
import AppText from '../../../SharedComponents/Atomic/AppText';
import { useSelector } from 'react-redux';
import { cartDetailRowStyle } from '../../Styles';

const CartSummaryRow = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = cartDetailRowStyle(darkMode);

    return (
        <View style={styles.container}>
            <AntDesign name='caretright' color={COLORS.primary} />
            <AppText style={styles.label}>{props.label}</AppText>
            <View style={styles.valuesContainer}>
                {props.label !== 'Items in Cart' ? <AppText style={styles.currnecy}>JOD </AppText> : null}
                {
                    props.label !== 'Items in Cart' ?
                        <AppText style={styles.value}>{props.value.toFixed(2)}</AppText>
                        :
                        <AppText style={styles.value}>{props.value}</AppText>
                }
            </View>
        </View>
    );
};

export default CartSummaryRow;