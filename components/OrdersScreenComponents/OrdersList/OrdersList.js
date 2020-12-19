import React, {useState} from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../../constants/colors/colors';
import { fetchOrders } from '../../../store/actions/actions';
import OrderCard from './OrderCard/OrderCard';

const OrdersList = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const dispatch = useDispatch();
    const renderOrderItem = order => {
        return (
            <OrderCard order={order.item} />
        );
    }; 

    const refreshOrders = async () => {
        setIsRefreshing(true);
        await dispatch(fetchOrders());
        setIsRefreshing(false);
    };

    return (
        <FlatList
            data={props.orders}
            renderItem={renderOrderItem}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={refreshOrders}
                    tintColor={darkMode ? COLORS.light : COLORS.dark} />
            }
        />
    );
};

export default OrdersList;