import React from 'react';
import { View, FlatList } from 'react-native';
import Product from '../../SharedComponents/Product/Product';
import AppText from '../../SharedComponents/Atomic/AppText';
import { topListStyle } from '../Styles';
import { useSelector } from 'react-redux';


// Contains special products on the top of HomeScreen.
const TopList = props => {

    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = topListStyle(darkMode);

    const renderSpecialProduct = product => <Product product={product.item} />;

    return (
        <View style={styles.container}>
            <AppText style={styles.text}>{props.title}</AppText>
            <FlatList
                horizontal
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

