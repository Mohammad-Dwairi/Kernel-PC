import React, { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../components/SharedComponents/Atomic/Container';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/SharedComponents/Atomic/CustomHeaderButton';
import ProductsList from '../components/SharedComponents/ProductsList';
import { fetchProducts } from '../store/actions/ProductsActions';
import { COLORS } from '../constants/colors/colors';
import EmptyScreenText from '../components/SharedComponents/Atomic/EmptyScreenText';
import UserNameBadge from '../components/SharedComponents/Atomic/UserNameBadge';

const ProductsScreen = ({ route, navigation }) => {
    const categoryId = route.params.id;
    const categoryName = route.params.categoryName;
    // products state will hold one category products at any given time, (by passing categoryId with the http request).
    const products = useSelector(state => state.products.products);

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setIsLoading(true);
        await dispatch(fetchProducts(categoryId));
        setIsLoading(false);
    }, [dispatch, setIsLoading]);

    const refreshProducts = async () => {
        setIsRefreshing(true);
        await dispatch(fetchProducts(categoryId));
        setIsRefreshing(false);
    };

    useEffect(() => {
        loadProducts();
    }, [dispatch]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: categoryName,
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <UserNameBadge onPress={() => navigation.navigate('UserProfileScreen')}/>
                </HeaderButtons>
            ),
        });
    }, [categoryId]);

    if (isLoading) {
        return (
            <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={COLORS.primary} />
            </Container>
        );
    }

    let empty = (
        <EmptyScreenText
            title='No products in this category'
            message='Come back Later!'
        />
    )

    return (
        <Container>
            {products.length === 0 ? empty : <ProductsList products={products} isRefreshing={isRefreshing} onRefresh={refreshProducts} />}
        </Container>
    );

};


export default ProductsScreen;