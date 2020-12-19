import React from 'react';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import AppText from '../../../SharedComponents/Atomic/AppText';
import QuantityControl from './QuantityControl/QuantityControl';
import { cartProductStyle } from '../../Styles';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/colors/colors';

const CartProduct = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = cartProductStyle(darkMode);
    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image source={{ uri: props.item.image }} style={styles.image} resizeMode='contain' />
            </View>
            <View style={styles.body}>
                <View style={styles.titleContainer}>
                    <AppText style={styles.title}>{props.item.brand + ' ' + props.item.model}</AppText>
                </View>
                <QuantityControl item={props.item} index={props.index} />
                <View>
                    <AppText style={styles.price}>JOD {(props.item.price * props.item.quantity).toFixed(2)}</AppText>
                </View>
            </View>
        </View>
    );
};

export default CartProduct;