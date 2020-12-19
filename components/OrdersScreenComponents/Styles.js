import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors/colors';

export const orderDetailRowStyle = () => {
    const styles = StyleSheet.create({
        detailRow: {
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 5
        },
        label: {
            fontFamily: 'open-sans-m',
            marginHorizontal: 5
        },
        values: {
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-evenly',

        },
        value: {
            flex: 2,
            textAlign: 'right',
            fontFamily: 'open-sans-r'
        },
        currnecy: {
            flex: 1,
            textAlign: 'right',
            color: COLORS.price,
        }
    });
    return styles;
};

export const orderProductStyle = () => {
    const styles = StyleSheet.create({
        container: {
            borderWidth: 2,
            borderColor: COLORS.primary,
            marginVertical: 10,
            borderRadius: 7,
            padding: 10,
        }
    });
    return styles;
};

export const orderCardStyles = darkMode => {
    const styles = StyleSheet.create({
        container: {
            borderRadius: 10,
            overflow: 'hidden',
            margin: 10
        },
        titleContainer: {
            padding: 5,
            backgroundColor: COLORS.primary,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row'
        },
        title: {
            fontSize: 16,
            color: COLORS.accent
        },
        detailContainer: {
            flex: 1,
            justifyContent: 'space-around',
            padding: 5,
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent
        }
    });
    return styles;
};