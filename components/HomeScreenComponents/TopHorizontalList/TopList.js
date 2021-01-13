import React, { useEffect, useRef } from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import Product from '../../SharedComponents/Product/Product';
import AppText from '../../SharedComponents/Atomic/AppText';
import { topListStyle } from '../Styles';
import { useSelector } from 'react-redux';
import AppButton from '../../SharedComponents/Atomic/AppButton';


const ItemSeprator = () => (
    <View style={{ width: 20 }} />
);
// Contains special products on the top of HomeScreen.
const TopList = props => {
    let index = 0;
    let interval;
    const list = useRef();

    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = topListStyle(darkMode);

    const renderSpecialProduct = product => <Product product={product.item} />;

    const scrollToIndex = () => {
        try {
            list.current.scrollToIndex({ animated: true, index: index++ });
            if (index > 5) {
                index = 0;
            }
        }
        catch (err) {

        }
    };

    interval = setInterval(() => {
        scrollToIndex();
    }, 1500);


    return (
        <View style={styles.container}>
            <AppText style={styles.text}>{props.title}</AppText>
            <FlatList
                ref={list}
                horizontal={true}
                onTouchStart={() => clearInterval(interval)}
                onTouchEnd={() => interval = setInterval(() => scrollToIndex(), 2000)}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
                data={props.list}
                renderItem={renderSpecialProduct}
            />
        </View>
    );
};

export default TopList;

