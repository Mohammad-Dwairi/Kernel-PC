import React, { useCallback, useEffect, useState } from 'react';
import AppText from '../components/SharedComponents/Atomic/AppText';
import Container from '../components/SharedComponents/Atomic/Container';
import ReviewsList from '../components/ReviewsScreenComponents/ReviewsList';
import ReviewInput from '../components/ReviewsScreenComponents/Review/ReviewInput';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ActivityIndicator, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchReviews } from '../store/actions/actions';
import { COLORS } from '../constants/colors/colors';
const ReviewsScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dispatch = useDispatch();

    const loadReviews = useCallback( async () => {
        setIsLoading(true);
        await dispatch(fetchReviews());
        setIsLoading(false);
    }, [dispatch, setIsLoading]);

    const refreshReviews = async () => {
        setIsRefreshing(true);
        await dispatch(fetchReviews());
        setIsRefreshing(false);
    };

    useEffect(() => {
        loadReviews();
    }, [dispatch]);

    if (isLoading) {
        return (
            <Container style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color={COLORS.primary} />
            </Container>
        );
    }

    return (
        <Container>
            <ReviewsList refresh={isRefreshing} OnRefresh={refreshReviews} />

            <ReviewInput />
            {Platform.OS === 'ios' ? <KeyboardSpacer topSpacing={-40} /> : null}

        </Container>
    );
};

export default ReviewsScreen;