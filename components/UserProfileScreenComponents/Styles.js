import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors/colors';
export const userNameCardStyles = (darkMode) => {
    return StyleSheet.create({
        container: {
            shadowOpacity: 0.6,
            shadowOffset: { width: 0, height: 1 },
            elevation: 6,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            width: '100%',
            height: Dimensions.get('screen').height / 2.5,
            borderBottomRightRadius: 30,
            borderBottomLeftRadius: 30
        },
        userName_Symbol: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        symbolContainer: {
            backgroundColor: darkMode ? COLORS.accent : COLORS.light,
            width: 80,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            margin: 15
        },
        symbol: {
            color: COLORS.primary,
            fontSize: 50,
            fontFamily: 'good-times',
        },
        userNameText: {
            minWidth: 100,
            color: COLORS.primary,
            fontSize: 24,
            fontFamily: 'open-sans-b',
        },
    });
};

export const userInfoRowStyles = () => {
    return StyleSheet.create({
        container: {
            marginTop: 20,
            marginHorizontal: 20,
            padding: 5,
            borderBottomWidth: 1,
            borderColor: COLORS.accent
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5
        },
        label: {
            fontFamily: 'good-times',
            color: COLORS.primary,
        },
    });
};