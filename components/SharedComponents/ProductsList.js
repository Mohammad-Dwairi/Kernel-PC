import React from 'react';
import { FlatList, Dimensions, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants/colors/colors';
import Product from './Product/Product';

const ProductsList = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const renderProduct = product => {
        return (
            <Product
                index={product.index}
                product={product.item}
                //style={{ height: Dimensions.get('window').height / 3.3, maxHeight: 220}}
            />
        );
    };

    return (
        <FlatList
            contentContainerStyle={{ alignItems: 'center' }}
            data={props.products}
            renderItem={renderProduct}
            removeClippedSubviews={true}
            refreshControl={
                <RefreshControl 
                    refreshing={props.isRefreshing} 
                    onRefresh={props.onRefresh} 
                    tintColor={darkMode ? COLORS.light : COLORS.dark}/>
            }
        />
    );
};

export default React.memo(ProductsList);