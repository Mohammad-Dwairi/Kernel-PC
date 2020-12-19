import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabBarNavigator from './TabBarNavigator';
import CustomSideDrawer from '../components/SharedComponents/CustomSideDrawer/CustomSideDrawer';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants/colors/colors';

const SideDrawer = createDrawerNavigator();

const SideDrawerNavigator = () => {
    const darkMode = useSelector(state => state.darkMode.isDark);

    return (
        <SideDrawer.Navigator
            drawerContent={(props) => <CustomSideDrawer {...props} />}
            drawerStyle={{
                backgroundColor: darkMode ? COLORS.dark : COLORS.accent
            }}
        >
            <SideDrawer.Screen name='Home' component={TabBarNavigator} />

        </SideDrawer.Navigator>
    );
};

export default SideDrawerNavigator;