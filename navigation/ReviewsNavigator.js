import React from 'react';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import { COLORS } from '../constants/colors/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from 'react-redux';

const AuthNavigator = () => {

    const Tab = createMaterialTopTabNavigator();
    const darkMode = useSelector(state => state.darkMode.isDark);
    return (
        <Tab.Navigator
            tabBarOptions={
                {   
                    style: { backgroundColor: darkMode ? COLORS.dark : COLORS.light, borderWidth: 0, shadowOpacity: 0 },
                    indicatorStyle: { backgroundColor: COLORS.primary },
                    activeTintColor: darkMode ? COLORS.light : COLORS.primary,
                    labelStyle: { fontFamily: 'good-times' }
                }
            }>
            <Tab.Screen name="Details" component={ProductDetailScreen} />
            <Tab.Screen name="Reviews" component={ReviewsScreen} />
        </Tab.Navigator>
    );
};

export default AuthNavigator;