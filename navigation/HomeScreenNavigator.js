import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants/colors/colors';
import { Dimensions, Image, Platform, View } from 'react-native';
import AppText from '../components/SharedComponents/Atomic/AppText';
import ProductNavigator from './ProductNavigator';
import UserProfileScreen from '../screens/UserProfileScreen';

const Stack = createStackNavigator();

const HomeScreenNavigator = () => {
    const darkMode = useSelector(state => state.darkMode.isDark);

    const defaultScreenOptions = {
        cardStyleInterpolator:  Platform.OS === 'ios' ? CardStyleInterpolators.forHorizontalIOS : CardStyleInterpolators.forScaleFromCenterAndroid,
        headerTitle: () => ( <Image source={require('../assets/logo.png')} style={{ height: 31, width: 104 }} /> ),
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
            <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={defaultScreenOptions}

            />
            <Stack.Screen
                name='ProductsScreen'
                component={ProductsScreen}
                options={defaultScreenOptions}
            />
            <Stack.Screen
                name='ProductScreen'
                component={ProductNavigator}
                options={defaultScreenOptions}
            />
            <Stack.Screen
                name='UserProfileScreen'
                component={UserProfileScreen}
                options={defaultScreenOptions}
            />
        </Stack.Navigator>
    );
};

export default HomeScreenNavigator;