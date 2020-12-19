import React, { useLayoutEffect } from 'react';
import { ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CartProductsList from '../components/CartScreenComponents/CartProductsList/CartProductsList';
import CartSummary from '../components/CartScreenComponents/CartSummary/CartSummary';
import Container from '../components/SharedComponents/Atomic/Container';
import CustomHeaderButton from '../components/SharedComponents/Atomic/CustomHeaderButton';
import UserNameBadge from '../components/SharedComponents/Atomic/UserNameBadge';

const CartScreen = ({ navigation, route }) => {

    // Additional Screen options added to the defalultScreenOptions in CartScreenNavigator.
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Menu' iconName='ios-menu' onPress={navigation.toggleDrawer} />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <UserNameBadge onPress={() => navigation.navigate('UserProfileScreen')}/>
                </HeaderButtons>
            )
        });
    }, [navigation, route]);

    const cartItems = useSelector(state => state.cart.cart);
    const totalQuantity = useSelector(state => state.cart.quantityTotal);

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <CartProductsList cartItems={cartItems} />
                <CartSummary totalQuantity={totalQuantity} cartItems={cartItems} />
            </ScrollView>
        </Container>
    );
};

export default CartScreen;