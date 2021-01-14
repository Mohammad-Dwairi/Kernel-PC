import React, { useRef, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Product from '../../SharedComponents/Product/Product';
import AppText from '../../SharedComponents/Atomic/AppText';
import { topListStyle } from '../Styles';
import { useSelector } from 'react-redux';


// Contains special products on the top of HomeScreen.
const TopList = props => {
    let index = 0;
    let interval;
    let timer;
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

    useEffect(() => {
        interval = setInterval(() => {
            scrollToIndex();
        }, 4000);
    }, []);


    return (
        <View style={styles.container}>
            <AppText style={styles.text}>{props.title}</AppText>
            <FlatList
                ref={list}
                horizontal={true}
                onTouchStart={() => clearInterval(interval)}
                //onTouchMove={() => interval = setInterval(() => {scrollToIndex(); }, 4000)}
                //pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                //removeClippedSubviews={true}
                data={props.list}
                renderItem={renderSpecialProduct}
            />
        </View>
    );
};

export default TopList;

