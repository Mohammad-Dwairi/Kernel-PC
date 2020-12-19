import { COLORS } from '../../../constants/colors/colors';
import { StyleSheet } from 'react-native';

export const darkModeSwitchStyle = darkMode => {
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: COLORS.primary,
            paddingVertical: 10
        },
        label: {
            fontFamily: 'good-times',
            fontSize: 15,
            color: COLORS.accent
        }
    });
    return styles;
};

export const customSideDrawerStyle = () => {
    const styles = StyleSheet.create({
        label: {
            fontFamily: 'good-times'
        },
        item: {
            paddingVertical: 15
        },
        title: {
            color: COLORS.primary,
            fontFamily: 'good-times',
            fontSize: 20,
            textAlign: 'center'
        },
        titleContainer: {
            backgroundColor: COLORS.accent
        }
    });
    return styles;
};