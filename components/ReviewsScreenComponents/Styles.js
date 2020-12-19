import { COLORS } from '../../constants/colors/colors';
import { StyleSheet, Dimensions, Platform } from 'react-native';

export const reviewCardStyle = (darkMode) => {
    return StyleSheet.create({
        container: {
            width: Dimensions.get('screen').width - 20,
            padding: 10,
            minHeight: 70,
            marginVertical: 15,
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.7,
            elevation: 6
        },
        header: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 5,
            paddingBottom: 3,
            borderBottomColor: COLORS.primary,
            borderBottomWidth: 1
        },
        headerText: {
            fontFamily: 'open-sans-m'
        },
        dateText: {
            fontSize: 11
        },
        badge: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 2,
            marginRight: 5,
            backgroundColor: COLORS.primary,
            width: 20,
            height: 20,
            borderRadius: 10
        },
        badgeText: {
            color: COLORS.accent,
            fontFamily: 'good-times'
        }
    });
};

export const reviewInputStyle = (darkMode) => {
    return StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomColor: COLORS.primary,
            borderBottomWidth: 1,
            padding: 7,
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            width: '100%',
            alignSelf: 'center'
        },
        input: {
            flex: 1,
            paddingHorizontal: 5,
            paddingVertical: Platform.OS === 'ios' ? 10 : 5,
            borderRadius: 5,
            color: darkMode ? COLORS.accent : COLORS.dark
        },
        send: {
            marginHorizontal: 10
        }
    });
};