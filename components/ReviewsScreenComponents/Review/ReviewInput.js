import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { reviewInputStyle } from '../Styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors/colors';
import Review from '../../../models/Review';
import { addReview } from '../../../store/actions/ProductsActions';

const ReviewInput = props => {

    const darkMode = useSelector(state => state.darkMode.isDark);
    const userName = useSelector(state => state.auth.userName);
    const styles = reviewInputStyle(darkMode);

    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const addReviewHandler = async () => {
        if (review.trim() === '') {
            return;
        }
        setIsLoading(true);
        await dispatch(addReview(new Review(Math.random().toString(), userName, new Date(), review)));
        setReview('');
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Leave a review'
                placeholderTextColor={darkMode ? COLORS.accent : COLORS.text}
                multiline={true}
                value={review}
                onChangeText={(text) => setReview(text)}
            />
            <TouchableOpacity style={styles.send} onPress={addReviewHandler} disabled={isLoading}>
                {isLoading ? <ActivityIndicator size='small' color={COLORS.primary} /> : <Ionicons name='ios-send' size={30} color={COLORS.primary} />}
            </TouchableOpacity>
        </View>
    );
};

export default ReviewInput;