import React from 'react';
import { View, TouchableOpacity, ImageBackground, Platform, ActivityIndicator } from 'react-native';
import AppText from '../Atomic/AppText';
import { useNavigation } from '@react-navigation/native';
import AddToCartButton from './ProductButtons/AddToCartButton';
import AddToWishlistButton from './ProductButtons/AddToWishListButton';
import { productStyle } from './Styles';
import { COLORS } from '../../../constants/colors/colors';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

const Product = props => {

    const navigation = useNavigation();
    const styles = productStyle();
    const dispatch = useDispatch();

    const onPressHandler = () => {
        dispatch({type: 'SET_PRODUCT', product: product});
        navigation.navigate('ProductScreen', { screen: 'Details', params: { product: props.product }} );
    };


    return (
        <TouchableOpacity
            style={{ ...styles.container, ...props.style }}
            activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.8}
            onPress={() => navigation.navigate('ProductScreen', { screen: 'Details', params: { product: props.product } })}
            //onPress={onPressHandler}
            >
            <ImageBackground resizeMode='contain' style={styles.image} source={{ uri: props.product.images[0] }}>


            </ImageBackground>
            <View style={styles.bottomBar}>
                <AddToWishlistButton product={props.product} productKey={props.productKey} />
                <View style={styles.titleContainer}>
                    <AppText style={styles.text}>{props.product.brand + " " + props.product.model}</AppText>
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Entypo name='price-tag' color={COLORS.primary} size={25} /> */}
                        <AppText style={{ color: COLORS.text, fontFamily: 'open-sans-m' }}>JOD {props.product.price.toFixed(2)}</AppText>
                    </View>
                </View>
                <AddToCartButton product={props.product} />
            </View>

        </TouchableOpacity>
    );
};

export default React.memo(Product);