import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../../constants/colors/colors';
import AppText from '../../SharedComponents/Atomic/AppText';
import { specsStyle } from '../Styles';

const Specs = props => {

    const styles = specsStyle();
    let specs = null;

    // Data section in laptops categories is object that hold key-value pairs, whereas in other types it is just a String.
    if (typeof (props.data) === 'object') {
        specs = Object.keys(props.data).map(key => {
            if (key === 'Overview') {
                return (
                    <View key={key} style={{marginTop: 10}}>
                        <View style={styles.titleContainer}>
                            <AppText style={styles.title}>{key}</AppText>
                        </View>
                        <AppText style={{ flex: 1, textAlign: 'center' }}>{props.data[key]}</AppText>
                    </View>
                );
            }
            return (
                <View style={styles.textContainer} key={key}>
                    <AppText style={{ flex: 1, fontFamily: 'open-sans-b', color: COLORS.primary }}>{key}</AppText>
                    <AppText style={{ flex: 1, textAlign: 'center' }}>{props.data[key]}</AppText>
                </View>
            );
        });
    } // means out of stock, no other value can take 0 value except it.
    else if (props.data === 0) {
        specs = (
            <View style={styles.textContainer}>
                <AppText style={{ flex: 1 }}>
                    Out Of Stock
                </AppText>
            </View>
        );
    }
    else {
        specs = (
            <View style={styles.textContainer}>
                <AppText style={{ flex: 1 }}>
                    {props.title === "Price" ? 'JOD ' : null}
                    {props.title === 'Left in stock' && props.data === 0 ? 'Out of stock' : null}
                    {props.title === 'Price' ? props.data.toFixed(2) : props.data}
                    {props.title === 'Left in stock' && props.data !== 0 ? ' Items' : null}
                </AppText>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.titleContainer}>
                <AppText style={styles.title}>{props.title}</AppText>
            </View>
            {specs}
        </View>
    );
};



export default Specs;