import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../../../constants/colors/colors';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../../../store/actions/actions';
import Toast from 'react-native-toast-message';
import { addToWishlistStyle } from '../Styles';

const AddToWishlistButton = props => {

    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.products).map(p => p.product);
    const exists = wishlist.find((product) => product.id === props.product.id);
    const index = wishlist.findIndex(i => props.product.id === i.id);
    
    const onPressHandler = () => {

        if (exists) {
            Toast.show({
                type: 'error',
                visibilityTime: 2000,
                text1: 'Removed from your wishlist',
                text2: 'You can view your wished products in the wishlist tab.'
            });
            //console.log(props.product);
            dispatch(removeFromWishlist(index))
        }
        else {
            Toast.show({
                visibilityTime: 2000,
                text1: 'Added to your wishlist',
                text2: 'You can view your wished products in the wishlist tab.'
            });
            //console.log(props.product);
            dispatch(addToWishlist(props.product));
        }

    };

    let icon = <AntDesign name='hearto' color={COLORS.accent} size={Dimensions.get('screen').width * 0.07} />;
    if (exists) {
        icon = <AntDesign name='heart' color={COLORS.accent} size={Dimensions.get('screen').width * 0.07} />;
    }

    const styles = addToWishlistStyle();

    return (
        <TouchableOpacity
            style={styles.btnLeftContainer}
            onPress={onPressHandler}>
            {icon}
        </TouchableOpacity>
    );
};

export default AddToWishlistButton;