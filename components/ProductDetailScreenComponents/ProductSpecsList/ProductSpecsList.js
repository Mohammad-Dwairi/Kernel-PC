import React from 'react';
import { View } from 'react-native';
import AppText from '../../SharedComponents/Atomic/AppText';
import Specs from './Specs';
import { productsSpecsListStyle } from '../Styles'
import { useSelector } from 'react-redux';


const ProductSpecsList = props => {
    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = productsSpecsListStyle(darkMode);

    return (
        <View style={styles.container}>
            <View style={styles.brandContainer}>
                <View style={styles.labelContainer}>
                    <AppText style={styles.label}>Brand & Model</AppText>
                </View>
                <View style={styles.textContainer}>
                    <AppText style={styles.brand}>{props.product.brand + " " + props.product.model}</AppText>
                </View>
            </View>
            <View style={styles.section}>
                <Specs data={props.product.price} title='Price' />
            </View>
            {
                props.product.categoryId === 'processor' ||
                    props.product.categoryId === 'graphicsCard' ||
                    props.product.categoryId === 'ram' ||
                    props.product.categoryId === 'storage' ||
                    props.product.categoryId === 'powerSupply' ||
                    props.product.categoryId === 'motherboard' ?
                    null :
                    <View style={styles.section}>
                        <Specs data={props.product.color} title='Color' />
                    </View>
            }
            <View style={styles.section}>
                <Specs data={props.product.quantity} title='Left in stock' />
            </View>
            <View style={styles.section}>
                <Specs data={props.product.description} title='Specifications' />
            </View>
        </View>
    );
};

export default ProductSpecsList;