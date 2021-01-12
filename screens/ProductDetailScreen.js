import React, { useEffect, useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductImages from '../components/ProductDetailScreenComponents/ProductImages';
import ProductSpecsList from '../components/ProductDetailScreenComponents/ProductSpecsList/ProductSpecsList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/SharedComponents/Atomic/CustomHeaderButton';
import Container from '../components/SharedComponents/Atomic/Container';
import Buttons from '../components/ProductDetailScreenComponents/Buttons';
const ProductDetailScreen = ({ route, navigation }) => {


    const product = route.params.product;
    const dispatch = useDispatch();
    useEffect(() => {
        //needed to determine the product id when adding new review, (don't know how to pass it with navigation!)
        dispatch({type: 'SET_PRODUCT', id: product.id})
    }, [product.id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: product.brand,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Menu' iconName='md-person' onPress={() => {}} />
                </HeaderButtons>
            ),
        });
    }, [product.id]);

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProductImages product={product} />
                <Buttons product={product}/>
                <ProductSpecsList product={product} />
            </ScrollView>
        </Container>
    );
};

export default ProductDetailScreen;