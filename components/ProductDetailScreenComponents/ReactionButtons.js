import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AppText from '../SharedComponents/Atomic/AppText';
import { AntDesign } from '@expo/vector-icons';
import { productImagesStyle } from './Styles';
import { COLORS } from '../../constants/colors/colors';
import { dislike, fetchDislikedUsers, fetchLikedUsers, like } from '../../store/actions/actions';

const ReactionButtons = props => {
    
    // States to control like and dislike buttons and thier numbers.
    const liked = useSelector(state => state.reviews.isLiked);
    const [isLiked, setIsLiked] = useState(liked);
    const [likes, setLikes] = useState(props.numberOfLikes);

    //const [isDisliked, setIsDisliked] = useState(disliked);
    const isDisliked = useSelector(state => state.reviews.isDisliked);
    const [dislikes, setDislikes] = useState(props.numberOfDislikes);

    const dispatch = useDispatch();

    const likeHandler = () => {
        if (isLiked) {
            // If isLiked, then seconds press will remove the like.
            setLikes((prev) => prev - 1);
            dispatch(like(likes - 1, 'delete'));
            //setIsLiked(false);
        }
        else {
            setLikes(prev => prev + 1);
            dispatch(like(likes + 1, 'add'));
            //setIsLiked(true);
        }
    };

    const dislikeHandler = () => {
        if (isDisliked) {
            setDislikes((prev) => prev - 1);
            dispatch(dislike(dislikes - 1, 'delete'));
            //setIsDisliked(false);
        }
        else {
            setDislikes(prev => prev + 1);
            dispatch(dislike(dislikes + 1, 'add'));
            //setIsDisliked(true);
        }
    };    

    useEffect(() => {
        dispatch(fetchLikedUsers());
        dispatch(fetchDislikedUsers());
    }, [dispatch]);

    const styles = productImagesStyle();

    return (
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
    );
};

export default ReactionButtons;