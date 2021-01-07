import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/colors/colors';

export const productStyle = () => {
    const styles = StyleSheet.create({
        container: {
            width: Dimensions.get('window').width * 0.95, 
            margin: 10,
            backgroundColor: 'white', 
            borderRadius: 4,
            borderWidth: 2,
            borderColor: COLORS.primary, 
            shadowColor: 'black',
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 5
        },
        image: {
            height: 150,
            //flex: 3
        },
        titleContainer: {
            flex: 3,
            paddingHorizontal: 5,
            alignItems: 'center',
            padding: 1, 
        },
        bottomBar: {
            //flex: 1,
            //height: 80,
            paddingBottom: 5,
            alignItems: 'flex-end', 
            justifyContent: 'space-around',
            flexDirection: 'row',
            //backgroundColor: 'rgba(0,0,0,0.4)'
        },
        text: {
            fontSize: Dimensions.get('screen').width * 0.035,
            color: COLORS.text,
            textAlign: 'center',
            fontFamily: 'open-sans-b'
        },
        label: {
            fontSize: 10,
            color: 'gray'
        },

    });
    return styles;
};

export const addToCartStyle = () => {
    const styles = StyleSheet.create({
        btnRightContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: "space-between",
            backgroundColor: COLORS.primary,
            padding: 5,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            shadowColor: 'black',
            shadowOpacity: 0.4,
            shadowOffset: { width: -4, height: 5 },
            shadowRadius: 5
        }
    });
    return styles;
};

export const addToWishlistStyle = () => {
    const styles = StyleSheet.create({
        btnLeftContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: "space-between",
            backgroundColor: COLORS.primary,
            padding: 5,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            shadowColor: 'black',
            shadowOpacity: 0.4,
            shadowOffset: { width: 4, height: 5 },
            shadowRadius: 5
        },
    });
    return styles;
};