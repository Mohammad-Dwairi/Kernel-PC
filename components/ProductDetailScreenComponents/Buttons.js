import React from 'react';
import AppButton from '../SharedComponents/Atomic/AppButton';
import { StyleSheet, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, removeFromWishlist } from '../../store/actions/actions';
import Toast from 'react-native-toast-message';

const Buttons = props => {

    const dispatch = useDispatch();

    // Cart-Items and Wishlist Products are needed to determine if the product is already added to one of them.
    const cartItems = useSelector(state => state.cart.cart);
    const wishlistproducts = useSelector(state => state.wishlist.products).map(p => p.product);
    const cartProductIndex = cartItems.findIndex(cart => cart.id === props.product.id);
    const wishlistProductIndex = wishlistproducts.findIndex(product => product.id === props.product.id);

    // const wishlist = useSelector(state => state.wishlist.products).map(p => p.product);
    // const exists = wishlist.find((product) => product.id === props.product.id);
    // const index = wishlist.findIndex(i => props.product.id === i.id);

    // To check if the poduct is out of stock, if so, don't allow the user to add it to the cart. 
    const inStock = props.product.quantity;

    const onPressAddToCartHandler = () => {
        if (inStock === 0) {
            Toast.show({
                type: 'error',
                visibilityTime: 2000,
                text1: 'Sorry, this product is out of stock',
                text2: ''
            });
            return;
        }
        if (cartProductIndex > -1) {
            // If the product is already in the cart, second press on the button will remove it.
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

    const onPressAddToWishlistHandler = () => {
        if (wishlistProductIndex > -1) {
            // If the product is already in the whishlist, second press on the button will remove it.
            Toast.show({
                type: 'error',
                visibilityTime: 2000,
                text1: 'Removed from your Wish-List',
                text2: 'You can view your wished products in the wishlist tab.'
            });
            dispatch(removeFromWishlist(props.product, wishlistProductIndex));
        }
        else {
            Toast.show({
                visibilityTime: 2000,
                text1: 'Added to your Wish-List',
                text2: 'You can view your wished products in the wishlist tab.'
            });
            dispatch(addToWishlist(props.product));
        }
    };

    // Cart button style logic.
    let cartIcon = <MaterialIcons name='add-shopping-cart' color={COLORS.accent} size={25} />;
    let cartText = 'Add To Cart';
    if (cartProductIndex > -1) {
        cartText = 'Remove From Cart';
        cartIcon = <MaterialIcons name='remove-shopping-cart' color={COLORS.accent} size={25} />;
    }

    // Wishlist button Style logic.
    let heartIcon = <AntDesign name='hearto' color={COLORS.accent} size={25} />;
    let heartText = 'Add To Wishlist';
    if (wishlistProductIndex > -1) {
        heartText = 'Remove From Wishlist';
        heartIcon = <AntDesign name='heart' color={COLORS.accent} size={25} />;
    }

    return (
        <View style={styles.container}>
            <AppButton style={styles.btn} title={cartText} onPress={onPressAddToCartHandler}>
                {cartIcon}
            </AppButton>
            <AppButton style={styles.btn} title={heartText} onPress={onPressAddToWishlistHandler}>
                {heartIcon}
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    btn: {
        flex: 1,
        marginHorizontal: 5
    }
});

export default Buttons;