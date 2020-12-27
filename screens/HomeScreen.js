import React, { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { StyleSheet, ScrollView, Button, View, ActivityIndicator } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/SharedComponents/Atomic/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import TopList from '../components/HomeScreenComponents/TopHorizontalList/TopList';
import Grid from '../components/HomeScreenComponents/CategoriesGrid/Grid';
import Container from '../components/SharedComponents/Atomic/Container';
import { fetchSpecialProducts, fetchWishlist } from '../store/actions/actions';
import UserNameBadge from '../components/SharedComponents/Atomic/UserNameBadge';
import { COLORS } from '../constants/colors/colors';

const HomeScreen = ({ route, navigation }) => {

    // Get special products by filtering all products.
    // Updated when useEffect Hook finishes fetching from the Firebase.
    const specialProducts = useSelector(state => state.products.specialProducts);
    const [isLoading, setIsLoading] = useState(false);
    // Used to dispatch action to redux reducers.
    const dispatch = useDispatch();

    // A callback function to be called from useEffect Hook.
    const fetchSpecials = useCallback(async () => {
        setIsLoading(true);
        await dispatch(fetchSpecialProducts());
        setIsLoading(false);
    }, [dispatch]);

    const loadWishlist = useCallback(async () => {
        dispatch(fetchWishlist());
    }, [dispatch]);

    useEffect(() => {  
        fetchSpecials();
    }, [dispatch]);

    useEffect(() => {
        loadWishlist();
    }, [dispatch]);

    // React-Navigation listener,
    // when HomeScreen goes out of foucs, it will refresh the current special products in order to make them synchronized as much as possible.
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('blur', () => {
    //         fetchSpecials();
    //     });
    //     return unsubscribe;
    // }, [navigation]);

    // Additional Screen options added to the defalultScreenOptions in HomeScreenNavigator.

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleStyle: {
                fontFamily: 'good-times',
                fontSize: 23
            },
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <UserNameBadge onPress={() => navigation.navigate('UserProfileScreen')} />
                </HeaderButtons>

            ),
            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title='Menu' iconName='ios-menu' onPress={navigation.toggleDrawer} />
                </HeaderButtons>
            )
        });
    }, [navigation, route]);

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.contianer}>
                {isLoading ? <ActivityIndicator color={COLORS.primary} size='large' /> : <TopList list={specialProducts} title='Special Products' />}
                <Grid />
            </ScrollView>
        </Container>
    );
};

const styles = StyleSheet.create({
    contianer: {
        paddingTop: 30
    }
});

export default HomeScreen;
