import React, { useEffect, useLayoutEffect, useState } from 'react';
import Container from '../components/SharedComponents/Atomic/Container';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from "../components/SharedComponents/Atomic/CustomHeaderButton";
import { useDispatch, useSelector } from 'react-redux';
import OrdersList from '../components/OrdersScreenComponents/OrdersList/OrdersList';
import EmptyScreenText from '../components/SharedComponents/Atomic/EmptyScreenText';
import { fetchOrders } from '../store/actions/OrdersActions';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors/colors';
import UserNameBadge from '../components/SharedComponents/Atomic/UserNameBadge';

const OrdersScreen = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchOrders()).then(() => {
            setIsLoading(false);
        });
    }, [dispatch]);

    // Additional Screen options added to the defalultScreenOptions in OrdersScreenNavigator.
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

    if (isLoading) {
        return (
            <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={COLORS.primary} />
            </Container>
        );
    }

    let content = (
        <EmptyScreenText
            title='You do not have previous orders'
            message='Your orders history will appear here after purchasing products'
        />
    );

    if (orders.length !== 0) {
        content = <OrdersList orders={orders} />;
    }

    return (
        <Container>
            {content}
        </Container>
    );
};

export default OrdersScreen;