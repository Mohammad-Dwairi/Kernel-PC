import React from 'react';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreenNavigator from './HomeScreenNavigator';
import CartScreenNavigator from './CartScreenNavigator';
import OrdersScreenNavigator from './OrdersScreenNavigator';
import WishlistScreenNavigator from './WishlistScreenNavigator';
import { COLORS } from '../constants/colors/colors';
import { useSelector } from 'react-redux';
import { Image } from 'react-native';
import NotifiactionBadge from '../components/SharedComponents/Atomic/NotificationBadge';

const Tab = createBottomTabNavigator();

const TabBarNavigator = () => {

    const darkMode = useSelector(state => state.darkMode.isDark);
    const cartLength = useSelector(state => state.cart.cart).length;
    return (
        <Tab.Navigator

            tabBarOptions={{
                
                activeTintColor: COLORS.primary,
                inactiveTintColor: COLORS.text,
                tabStyle: {
                    backgroundColor: darkMode ? COLORS.dark : COLORS.light,
                },
                style: {
                    borderTopWidth: 0,
                    shadowOffset: { height: 2, width: 0 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    shadowColor: 'black'
                }
            }}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {

                    if (route.name === 'Home')
                        return <Image source={require('../assets/adaptive-icon.png')} style={{width: 50, height: 50}}/>;
                    if (route.name === 'Shopping Cart')
                        return <NotifiactionBadge number={cartLength}><Ionicons name='ios-cart' color={color} size={size} /></NotifiactionBadge>;
                    if (route.name === 'Orders History')
                        return <Entypo name='archive' color={color} size={size} />;
                    if (route.name === 'Wishlist')
                        return focused ? <AntDesign name='heart' color={color} size={size} /> : <AntDesign name='hearto' color={color} size={size} />;
                }
            })}
        >
            <Tab.Screen name='Home' component={HomeScreenNavigator} />
            <Tab.Screen name='Shopping Cart' component={CartScreenNavigator} />
            <Tab.Screen name='Orders History' component={OrdersScreenNavigator} />
            <Tab.Screen name='Wishlist' component={WishlistScreenNavigator} />
        </Tab.Navigator>
    );
};

export default TabBarNavigator;