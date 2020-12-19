import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import ReviewCard from './Review/ReviewCard';

const ReviewsList = props => {
    const reviews = useSelector(state => state.reviews.reviews);
    const renderReview = review => {
        return (
            <ReviewCard review={review.item} />
        );
    };

    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={reviews}
            renderItem={renderReview}
            contentContainerStyle={{ alignItems: 'center' }}
            refreshControl={
                <RefreshControl onRefresh={props.onRefresh} refreshing={props.refresh} />
            }
        />
    );
};

export default React.memo(ReviewsList);