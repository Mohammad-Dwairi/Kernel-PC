import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../../../../SharedComponents/Atomic/AppText';
import { increaseQuantity, decreaseQuantity } from '../../../../../store/actions/actions';
import { quantityControlStyle } from '../../../Styles';
import { COLORS } from '../../../../../constants/colors/colors';

const QuantityControl = props => {

    const dispatch = useDispatch();
    const styles = quantityControlStyle();
    
    let icon = <Ionicons name='md-trash' size={35} color={COLORS.darkRed} />
    if (props.item.quantity > 1) {
        icon = <Ionicons name='ios-remove' size={40} color={COLORS.primary} />
    }

    const onDecreaseHandler = () => {
        if (props.item.quantity === 1) {
            Alert.alert(
                'Remove from your cart?',
                'You can add it again any time',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Remove',
                        onPress: () => dispatch(decreaseQuantity(props.index)),
                        style: 'destructive'
                    },
                ],
            );
        }
        else {
            dispatch(decreaseQuantity(props.index))
        }
    };

    const onIncreaseHandler = () => {
        
        if (props.item.quantity >= props.item.inStock) {
            Alert.alert(
                'Sorry!',
                'Only ' + props.item.inStock + ' items left in stock',
                [{ text: 'OK' }]
            );
        }
        else if (props.item.quantity === 5) {
            Alert.alert(
                'Sorry!',
                'You can add only up to 5 of one product',
                [{ text: 'OK' }]
            );
        }
        else {
            dispatch(increaseQuantity(props.index));
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.controlButtons} onPress={onDecreaseHandler}>
                {icon}
            </TouchableOpacity>
            <View style={styles.controlButtons}>
                <AppText style={styles.quantityText}>Quantity</AppText>
                <AppText style={styles.quantityValue}>{props.item.quantity}</AppText>
            </View>
            <TouchableOpacity style={styles.controlButtons} onPress={onIncreaseHandler}>
                <Ionicons name='ios-add' size={40} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    );
};

export default QuantityControl;