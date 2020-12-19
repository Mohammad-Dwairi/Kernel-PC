import { COLORS } from '../../constants/colors/colors';
import { StyleSheet } from 'react-native';

export const productsSpecsListStyle = (darkMode) => {
    const styles = StyleSheet.create({
        labelContainer: {

            borderBottomWidth: 2,
            borderBottomColor: COLORS.primary,
            marginVertical: 5,
        },
        label: {
            fontFamily: 'good-times',
            fontSize: 16,
            paddingBottom: 2,
        },
        brand: {
            fontSize: 20,
        },
        textContainer: {
            borderLeftColor: COLORS.primary,
            borderLeftWidth: 3,
            paddingLeft: 10,
            flexDirection: 'row',
            marginVertical: 3
        },
        brandContainer: {
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            paddingVertical: 10,
            alignItems: 'center',
            shadowOpacity: 0.4,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 3
        },
        section: {
            marginVertical: 10,
            paddingHorizontal: 10
        }
    });
    return styles;
};

export const specsStyle = (darkMode) => {
    const styles = StyleSheet.create({
        titleContainer: {
            borderBottomWidth: 2,
            borderBottomColor: COLORS.primary,
            marginVertical: 5,
        },
        title: {
            fontFamily: 'good-times',
            fontSize: 16,
            paddingBottom: 2
        },
        label: {
            flex: 1,
            fontFamily: 'open-sans-m'
        },
        textContainer: {
            borderLeftColor: COLORS.primary,
            borderLeftWidth: 3,
            paddingLeft: 10,
            flexDirection: 'row',
            marginVertical: 7,
            alignItems: 'center',
        },
    });
    return styles;
};

export const productImagesStyle = () => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            marginBottom: 5,
            overflow: 'hidden'
        },
        optionsBar: {
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        actions: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            margin: 8,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10

        }
    });
    return styles;
};