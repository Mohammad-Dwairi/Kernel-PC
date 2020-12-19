import React, { useEffect, useState } from 'react';
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from '../../constants/colors/colors';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { productImagesStyle } from './Styles';
import AppText from '../SharedComponents/Atomic/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { like, dislike } from '../../store/actions/actions';

const ProductImages = props => {
    const styles = productImagesStyle();

    // userId is needed to check if the user has previously liked or disliked the product.
    const userId = useSelector(state => state.auth.userId);

    // States to control like and dislike buttons and thier numbers.
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(props.product.likes);
    const [isDisliked, setIsDisliked] = useState(false);
    const [dislikes, setDislikes] = useState(props.product.dislikes);

    const dispatch = useDispatch();

    const likeHandler = () => {
        if (isLiked) {
            // If isLiked, then seconds press will remove the like.
            setLikes((prev) => prev - 1);
            dispatch(like(likes - 1, 'delete'));
            setIsLiked(false);
        }
        else {
            setLikes(prev => prev + 1);
            dispatch(like(likes + 1, 'add'));
            setIsLiked(true);
        }

    };

    const dislikeHandler = () => {
        if (isDisliked) {
            setDislikes((prev) => prev - 1);
            dispatch(dislike(dislikes - 1, 'delete'));
            setIsDisliked(false);
        }
        else {
            setDislikes(prev => prev + 1);
            dispatch(dislike(dislikes + 1, 'add'));
            setIsDisliked(true);
        }

    };

    const fetchLikedUsers = async () => {
        const response = await fetch(`https://kernel-ea898.firebaseio.com/likes/${props.product.id}/${userId}.json`);
        const resData = await response.json();
    
        if (resData !== null) {
            setIsLiked(true);
        }
    };

    const fetchDislikedUsers = async () => {
        const response = await fetch(`https://kernel-ea898.firebaseio.com/dislikes/${props.product.id}/${userId}.json`);
        const resData = await response.json();

        if (resData !== null) {
            // response !null means that the current user has disliked.
            setIsDisliked(true);
        }
    };

    useEffect(() => {
        fetchLikedUsers();
        fetchDislikedUsers();
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <View style={styles.optionsBar}>
                <TouchableOpacity style={styles.actions} onPress={likeHandler} disabled={isDisliked}>
                    <AntDesign name={isLiked ? 'like1' : 'like2'} color={COLORS.accent} size={25} />
                    <AppText style={{ color: COLORS.accent }}>{likes}</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actions} onPress={dislikeHandler} disabled={isLiked}>
                    <AntDesign name={isDisliked ? 'dislike1' : 'dislike2'} color={COLORS.accent} size={25} />
                    <AppText style={{ color: COLORS.accent }}>{dislikes}</AppText>
                </TouchableOpacity>

            </View>
            <View style={{ flex: 2 }}>
                <SliderBox
                    images={props.product.images}
                    dotColor={COLORS.primary}
                    inactiveDotColor={COLORS.accent}
                    circleLoop
                    resizeMode={'contain'}
                    imageLoadingColor={COLORS.accent}
                    disableOnPress
                />
            </View>

        </View>
    );
};


export default React.memo(ProductImages);