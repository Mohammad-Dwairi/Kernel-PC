import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../../constants/colors/colors';
import AppText from '../../../SharedComponents/Atomic/AppText';
import OrderDetailRow from './OrderDetailRow/OrderDetailRow';
import OrderProduct from './OrderProduct/OrderProduct';
import { orderCardStyles } from '../../Styles';

const OrderCard = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = orderCardStyles(darkMode);

    const [showDetails, setShowDetails] = useState(false);

    let details = null;
    let button = <MaterialIcons name='expand-more' size={35} color={COLORS.primary} style={{alignSelf: 'center'}}/>;

    if (showDetails) {
        details = (
            <View>
                <OrderDetailRow label='Sub-Total Price' value={props.order.subtotal.toFixed(2)} />
                <OrderDetailRow label='Taxes' value={props.order.taxes.toFixed(2)} />
                <OrderDetailRow label='Shipping Fees' value={props.order.shippingFees.toFixed(2)} />
                <OrderProduct cartItems={props.order.cartItems} />
            </View>
        );

        button = <MaterialIcons name='expand-less' size={35} color={COLORS.primary} style={{alignSelf: 'center'}}/>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <AppText style={styles.title}>{props.order.formattedDate}</AppText>
            </View>
            <View style={styles.detailContainer}>
                {details}
                <OrderDetailRow label='Total Price' value={props.order.totalPrice.toFixed(2)} />
                <TouchableOpacity onPress={() => setShowDetails(prevState => !prevState)}>
                    {button}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OrderCard;