import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import SideDrawerNavigator from './SideDrawerNavigator';
import StartupScreen from '../screens/StartupScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const isStartup = useSelector(state => state.auth.isStartup);

    let startup = null;
    if (isStartup) {
        startup = (
            <Stack.Screen
                name='StartupScreen'
                component={StartupScreen}
            />
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {startup}
            {
                isLoggedIn ?
                    <Stack.Screen
                        name='App'
                        component={SideDrawerNavigator}
                    />
                    :
                    <Stack.Screen
                        name='AuthScreen'
                        component={AuthNavigator}

                    />
            }
        </Stack.Navigator>
    );
};

export default RootNavigator;