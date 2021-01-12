import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AppText from '../SharedComponents/Atomic/AppText';
import { AntDesign } from '@expo/vector-icons';
import { productImagesStyle } from './Styles';
import { COLORS } from '../../constants/colors/colors';
import { dislike, like } from '../../store/actions/ProductsActions';

const ReactionButtons = props => {

    const dispatch = useDispatch();

    const productId = props.product.id;

    const [product, setProduct] = useState(props.product); // To target re-render when changing the number of likes or dislikes.

    // used while removing the like record from the firebase.
    let LikedProductFirebaseKey = '';
    let DislikedProductFirebaseKey = '';

    // find if the product id exists in the user's liked products.
    // if so; get the firebase key to pass it to the unlike handler (firebaseKey == the node name in the firebase). 
    const isLiked = useSelector(state => state.products.likedProducts).some(likedProduct => {
        if (likedProduct.productId === productId) {
            LikedProductFirebaseKey = likedProduct.firebaseKey;
            return true;
        }
        return false;
    });

    const isDisliked = useSelector(state => state.products.dislikedProducts).some(dislikedProduct => {
        if (dislikedProduct.productId === productId) {
            DislikedProductFirebaseKey = dislikedProduct.firebaseKey;
            return true;
        }
        return false;
    });

    const likeHandler = () => {
        if (isLiked) {
            const updatedProduct = { ...product };
            updatedProduct.likes -= 1;
            dispatch(like(updatedProduct.likes, 'delete', LikedProductFirebaseKey));
            setProduct(updatedProduct);
        }
        else {
            const updatedProduct = { ...product };
            updatedProduct.likes += 1;
            dispatch(like(updatedProduct.likes, 'add', null));
            setProduct(updatedProduct);
        }
    };

    const dislikeHandler = () => {
        if (isDisliked) {
            const updatedProduct = { ...product };
            updatedProduct.dislikes -= 1;
            dispatch(dislike(updatedProduct.dislikes, 'delete', DislikedProductFirebaseKey));
            setProduct(updatedProduct);
        }
        else {
            const updatedProduct = { ...product };
            updatedProduct.dislikes += 1;
            dispatch(dislike(updatedProduct.dislikes, 'add', null));
            setProduct(updatedProduct);
        }
    };

    const styles = productImagesStyle();

    return (
        <View style={styles.optionsBar}>
            <TouchableOpacity style={styles.actions} onPress={likeHandler} disabled={isDisliked}>
                <AntDesign name={isLiked ? 'like1' : 'like2'} color={COLORS.accent} size={25} />
                <AppText style={{ color: COLORS.accent }}>{product.likes}</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actions} onPress={dislikeHandler} disabled={isLiked}>
                <AntDesign name={isDisliked ? 'dislike1' : 'dislike2'} color={COLORS.accent} size={25} />
                <AppText style={{ color: COLORS.accent }}>{product.dislikes}</AppText>
            </TouchableOpacity>
        </View>
    );
};

export default ReactionButtons;