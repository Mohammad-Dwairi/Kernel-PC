import React from 'react';
import { View, FlatList } from 'react-native';
import OrderDetailRow from '../OrderDetailRow/OrderDetailRow';
import { orderProductStyle } from '../../../Styles';

const renderOrderItems = item => {
    const styles = orderProductStyle();
    return (
        <View style={styles.container}>
            <OrderDetailRow label='Product' value={item.item.brand + " " + item.item.model} />
            <OrderDetailRow label='Quantity' value={item.item.quantity} />
            <OrderDetailRow label='Price per Item' value={item.item.price.toFixed(2)} />
        </View>
    );
};

// An order can contain more than one product, each product is rendered as a box in the order card
const OrderProduct = props => {
    return (
        <FlatList data={props.cartItems} renderItem={renderOrderItems} />
    );
};

export default OrderProduct;