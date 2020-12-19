import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors/colors';

export const cartProductStyle = darkMode => {
    const styles = StyleSheet.create({
        container: {
            width: Dimensions.get('window').width / 2,
            height: Dimensions.get('window').height / 2.2,
            maxWidth: 200,
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            margin: 10,
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: COLORS.accent,
            borderWidth: darkMode ? 0 : 2,
        },
        image: {
            height: Dimensions.get('window').height / 5
        },
        body: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            backgroundColor: COLORS.bg,
        },
        title: {
            textAlign: 'center',
            fontFamily: 'open-sans-m'
        },
        titleContainer: {
            width: '100%',
            padding: 10,
            borderTopWidth: 2,
            borderTopColor: COLORS.primary,
        },
        price: {
            paddingBottom: 5,
            marginLeft: 5,
            fontFamily: 'open-sans-m',
            //fontSize: 16
        },
        imageView: {
            flex: 1,
            backgroundColor: 'white',
        },
        quantity: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
    return styles;
};

export const quantityControlStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginVertical: 5,
        },
        controlButtons: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        quantityText: {
            fontFamily: 'open-sans-m',
            fontSize: 12,
        },
        quantityValue: {
            fontFamily: 'open-sans-b',
            fontSize: 18,
        }
    });
    return styles;
};


export const cartSummaryStyle = () => {
    const styles = StyleSheet.create({
        container: {
            marginHorizontal: 10,
            marginVertical: 20,
            padding: 5,
        },
        title: {
            textAlign: 'center',
            color: COLORS.primary,
            fontSize: 18,
            fontFamily: 'good-times',
        },
        titleContainer: {
            padding: 5,
            justifyContent: 'center',
        }
    });
    return styles;
};

export const cartDetailRowStyle = darkMode => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginVertical: 8,
            borderTopWidth: 2,
            padding: 10,
            borderRadius: 5,
            borderTopColor: COLORS.primary,
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            alignItems: 'center'
        },
        label: {
            flex: 1,
            textAlign: 'center',
            fontFamily: 'open-sans-b',
            //fontSize: 15,
            color: darkMode ? COLORS.accent : COLORS.text
        },
        valuesContainer: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',
            padding: 5
        },
        value: {
            flex: 1,
            color: darkMode ? COLORS.accent : COLORS.text,
            textAlign: 'center',
            fontSize: 15,
            fontFamily: 'open-sans-m'
        },
        currnecy: {
            flex: 1,
            textAlign: 'right',
            color: COLORS.price,
        }

    });
    return styles;
};

