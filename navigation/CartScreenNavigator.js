import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants/colors/colors';
import UserProfileScreen from '../screens/UserProfileScreen';
import { Dimensions } from 'react-native';

const Stack = createStackNavigator();

const CartScreenNavigator = () => {
    const darkMode = useSelector(state => state.darkMode.isDark);

    const defaultScreenOptions = {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTitle: 'Shopping Cart',
        headerTitleAlign: 'center',
        headerTintColor: darkMode ? COLORS.accent : COLORS.text,
        headerTitleStyle: {
            fontFamily: 'good-times',
            fontSize: Dimensions.get('screen').width * 0.04
        },
        headerStyle: {
            backgroundColor: darkMode ? COLORS.dark : COLORS.light,
            shadowOffset: { height: 2, width: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowColor: 'black'
        },
        headerBackTitle: 'Back',
    };

    return (
        <Stack.Navigator>
            <Stack.Screen name='CartScreen' component={CartScreen} options={defaultScreenOptions} />
            <Stack.Screen name='ProductDetailScreen' component={ProductDetailScreen} options={defaultScreenOptions}/>
            <Stack.Screen 
                name='UserProfileScreen'
                component={UserProfileScreen}
                options={defaultScreenOptions}
            />
        </Stack.Navigator>
    );
};

export default CartScreenNavigator;