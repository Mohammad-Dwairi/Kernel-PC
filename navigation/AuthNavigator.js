import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import UserSignupScreen from '../screens/UserSignupScreen';
import UserLoginScreen from '../screens/UserLoginScreen';
import { COLORS } from '../constants/colors/colors';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmailNotVerifiedScreen from '../screens/EmailNotVerifiedScreen';
import { useSelector } from 'react-redux';

const SignupNav = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
        >
            <Stack.Screen name='SignupScreen' component={UserSignupScreen}/>
            <Stack.Screen name='Verification' component={EmailNotVerifiedScreen}/>
        </Stack.Navigator>
    );
};

const AuthNavigator = () => {
    const Tab = createMaterialTopTabNavigator();
    const darkMode = useSelector(state => state.darkMode.isDark);
    return (
        <Tab.Navigator
            tabBarOptions={
                {   
                    style: { paddingTop: 15, backgroundColor: darkMode ? COLORS.dark : COLORS.light, borderWidth: 0, shadowOpacity: 0 },
                    indicatorStyle: { backgroundColor: COLORS.primary },
                    activeTintColor: COLORS.primary,
                    labelStyle: { fontFamily: 'good-times' }
                }
            }>
            <Tab.Screen name="Login" component={UserLoginScreen} />
            <Tab.Screen name="Signup" component={SignupNav} />
        </Tab.Navigator>
    );
};

export default AuthNavigator;