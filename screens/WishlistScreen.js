import React, { useLayoutEffect, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from '../components/SharedComponents/Atomic/Container';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/SharedComponents/Atomic/CustomHeaderButton';
import ProductsList from '../components/SharedComponents/ProductsList';
import { fetchWishlist } from '../store/actions/WishlistActions';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors/colors';
import EmptyScreenText from '../components/SharedComponents/Atomic/EmptyScreenText';
import UserNameBadge from '../components/SharedComponents/Atomic/UserNameBadge';

const WishlistScreen = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const products = useSelector(state => state.wishlist.products).map(product => product.product);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchWishlist()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    const refreshWishlist = async () => {
        setIsRefreshing(true);
        await dispatch(fetchWishlist());
        setIsRefreshing(false);
    };

    // Additional Screen options added to the defalultScreenOptions in WishlistScreenNavigator.
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Menu' iconName='ios-menu' onPress={navigation.toggleDrawer} />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <UserNameBadge onPress={() => navigation.navigate('UserProfileScreen')} />
                </HeaderButtons>
            )
        });
    }, [navigation, route]);

    if (isLoading) {
        return (
            <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={COLORS.primary} />
            </Container>
        );
    }


    const empty = (
        <EmptyScreenText
            title='No products in your Wish-List'
            message='Make a wish. You will find it here!'
        />
    );

    return (
        <Container>
            {products.length === 0 ? empty : <ProductsList products={products} refreshing={isRefreshing} onRefresh={refreshWishlist} />}
        </Container>
    );

};


export default WishlistScreen;