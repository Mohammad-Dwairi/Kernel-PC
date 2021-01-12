import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/colors/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../../store/actions/CartActions';
import Toast from 'react-native-toast-message';
import { addToCartStyle } from '../Styles';

const AddToCartButton = props => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cart);
    const index = cartItems.findIndex(cart => cart.id === props.product.id);
    const inStock = props.product.quantity;
    
    const onPressHandler = () => {
        if (inStock === 0) {
            Toast.show({
                type: 'error',
                visibilityTime: 2000,
                text1: 'Sorry, this product is out of stock',
                text2: ''
            });
            return;
        }
        if (index > -1) {
            Toast.show({
                type: 'error',
                visibilityTime: 2000,
                text1: 'Removed from your cart',
                text2: 'You can view your products in the cart tab.'
            });
        }
        else {
            Toast.show({
                visibilityTime: 2000,
                text1: 'Added to your cart',
                text2: 'You can view your products and change the quantity in the cart tab.'
            });
        }
        dispatch(addToCart(props.product));
    };

    let icon = <MaterialIcons name='add-shopping-cart' color={COLORS.accent} size={Dimensions.get('screen').width * 0.07} />;
    if (index > -1) {
        icon = <MaterialIcons name='remove-shopping-cart' color={COLORS.accent} size={Dimensions.get('screen').width * 0.07} />;
    }

    const styles = addToCartStyle();

    return (
        <TouchableOpacity
            style={styles.btnRightContainer}
            onPress={onPressHandler}>
            {icon}
        </TouchableOpacity>
    );
};

export default AddToCartButton;