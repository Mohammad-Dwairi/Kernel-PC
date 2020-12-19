import React from 'react';
import { FlatList } from 'react-native';
import CartProduct from './CartProduct/CartProduct';

const renderCartItem = item => {
    console.log(item.index);
    return (
        <CartProduct
            index={item.index}
            item={item.item}
        />
    );
};

const CartProductsList = props => {
    return (
        <FlatList
            horizontal
            data={props.cartItems}
            renderItem={renderCartItem}
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default CartProductsList;
