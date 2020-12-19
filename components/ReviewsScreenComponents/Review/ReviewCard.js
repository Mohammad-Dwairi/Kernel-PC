import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import AppText from '../../SharedComponents/Atomic/AppText';
import { reviewCardStyle } from '../Styles';
const ReviewCard = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = reviewCardStyle(darkMode);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.badge}>
                        <AppText style={styles.badgeText}>{props.review.userName.charAt(0)}</AppText>
                    </View>
                    <AppText style={styles.headerText}>{props.review.userName}</AppText>
                </View>
                <AppText style={styles.dateText}>{props.review.date}</AppText>
            </View>
            <View style={styles.userNameContainer}>
                <AppText>{props.review.content}</AppText>
            </View>
        </View>
    );
};

export default ReviewCard;