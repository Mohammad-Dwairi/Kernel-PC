import React from 'react';
import { View, Image } from 'react-native';
import DarkModeSwitch from './DarkModeSwitch/DarkModeSwitch';
import AppText from '../Atomic/AppText';
import { COLORS } from '../../../constants/colors/colors';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer'
import { customSideDrawerStyle } from './Styles'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSideDrawer = (props) => {

    const darkMode = useSelector(state => state.darkMode.isDark);
    const iconColor = darkMode ? COLORS.accent : COLORS.text;
    const styles = customSideDrawerStyle();
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label={() => ( <Image source={require('../../../assets/logo.png')} style={{ height: 31, width: 104 }} /> )}
                labelStyle={styles.label}
            />
            <DarkModeSwitch />
            <DrawerItem
                label={() => <AppText style={styles.label}>Profile</AppText>}
                icon={({ focused, color, size }) => <Ionicons name='md-person' color={iconColor} size={size} />}
                labelStyle={styles.label}
                style={styles.item}
                onPress={() => {props.navigation.navigate('UserProfileScreen')}}
            />
            <DrawerItem
                label={() => <AppText style={styles.label}>Home</AppText>}
                icon={({ focused, color, size }) => <Ionicons name='ios-desktop' color={iconColor} size={size} />}
                activeTintColor={COLORS.accent}
                labelStyle={styles.label}
                style={styles.item}
                onPress={() => { props.navigation.navigate('HomeScreen') }}
            />
            <DrawerItem
                label={() => <AppText style={styles.label}>Shopping Cart</AppText>}
                icon={({ focused, color, size }) => <Ionicons name='ios-cart' color={iconColor} size={size} />}
                labelStyle={styles.label}
                style={styles.item}
                onPress={() => props.navigation.navigate('Shopping Cart')}
            />
            <DrawerItem
                label={() => <AppText style={styles.label}>Orders History</AppText>}
                icon={({ focused, color, size }) => <Entypo name='archive' color={iconColor} size={size} />}
                labelStyle={styles.label}
                style={styles.item}
                onPress={() => props.navigation.navigate('Orders History')}
            />
            <DrawerItem
                label={() => <AppText style={styles.label}>Wish-List</AppText>}
                icon={({ focused, color, size }) => <AntDesign name='hearto' color={iconColor} size={size} />}
                labelStyle={styles.label}
                style={styles.item}
                onPress={() => props.navigation.navigate('Wishlist')}
            />
            <DrawerItem
                label={() => <AppText style={styles.label}>Logout</AppText>}
                icon={({ focused, color, size }) => <AntDesign name='logout' color={iconColor} size={size} />}
                labelStyle={styles.label}
                style={styles.item}
                onPress={() => {AsyncStorage.removeItem('userData'); dispatch({type: 'LOGOUT'})}}
            />
        </DrawerContentScrollView>
    );
};

export default CustomSideDrawer;