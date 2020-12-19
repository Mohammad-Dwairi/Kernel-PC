import React from 'react';
import { Alert, View } from 'react-native';
import { COLORS } from '../../../constants/colors/colors';
import { Ionicons, } from '@expo/vector-icons';
import AppText from '../../SharedComponents/Atomic/AppText';
import AppButton from '../../SharedComponents/Atomic/AppButton';
import CartSummaryRow from './CartSummaryRow/CartSummaryRow';
import { useDispatch } from 'react-redux';
import { addOrder} from '../../../store/actions/actions';
import EmptyScreenText from '../../SharedComponents/Atomic/EmptyScreenText';
import { useNavigation } from '@react-navigation/native';
import { cartSummaryStyle } from '../Styles';

const CartSummary = props => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const styles = cartSummaryStyle();

    let totalPrice = 0, subtotal = 0, taxes = 0, shippingFees = 0;

    props.cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    taxes = subtotal * 0.05;
    shippingFees = props.totalQuantity * 2
    totalPrice = subtotal + taxes + shippingFees;

    let content = (
        <EmptyScreenText
            title='No Items in your cart'
            message='Your products will appear here after adding them to the cart'
        />
    );

    const checkoutHandler = () => {
        Alert.alert(
            'Confirm Your Order?',
            'Total Price:  JOD ' + totalPrice.toFixed(2),
            [
                {
                    text: 'Order',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(addOrder(props.cartItems, subtotal, taxes, shippingFees, totalPrice, props.totalQuantity));
                        navigation.jumpTo('Orders History');
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ] 
        );
    };

    if (props.cartItems.length !== 0) {
        content = (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <AppText style={styles.title}>In Your Cart</AppText>
                </View>
                <View style={styles.detail}>
                    <CartSummaryRow label='Items in Cart' value={props.totalQuantity} />
                    <CartSummaryRow label='Price Sub-Total' value={subtotal} />
                    <CartSummaryRow label='Applied Taxes' value={taxes} />
                    <CartSummaryRow label='Shipping Fees' value={shippingFees} />
                    <CartSummaryRow label='Total Price' value={totalPrice} />
                    <AppButton
                        disabled={props.cartItems.length === 0}
                        title='Checkout' style={{ width: '45%', alignSelf: 'flex-end' }}
                        onPress={checkoutHandler}>
                        <Ionicons name='ios-arrow-forward' size={30} color={COLORS.accent} />
                    </AppButton>
                </View>
            </View>
        );
    }

    return content;
};

export default CartSummary;