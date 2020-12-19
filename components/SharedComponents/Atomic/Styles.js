import { COLORS } from '../../../constants/colors/colors';
import { StyleSheet, Dimensions } from 'react-native';

export const appButtonStyle = () => {
    const styles = StyleSheet.create({
        button: {
            flexDirection: 'row',
            height: 40,
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: COLORS.primary,
            width: '100%',
            borderRadius: 10,
            paddingHorizontal: 5
        },
        btnContainer: {
            alignItems: 'center',
            marginTop: 10
        },
        text: {
            flex: 1,
            textAlign: 'center',
            fontSize: Dimensions.get('screen').width * 0.03,
            fontFamily: 'good-times',
            color: COLORS.accent
        }
    });
    return styles;
};

export const appTextStyle = darkMode => {
    const styles = StyleSheet.create({
        text: {
            fontFamily: 'open-sans-r',
            color: darkMode ? COLORS.accent : COLORS.text
        }
    });
    return styles;
};

export const containerStyle = darkMode => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: darkMode ? COLORS.dark : 'white'
        }
    });
    return styles;
};

export const emptyScreenTextStyle = () => {
    const styles = StyleSheet.create({
        empty: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: Dimensions.get('window').height / 1.5,
            padding: 10
        },
        emptyTextTitle: {
            fontSize: 20,
            fontFamily: 'good-times',
            color: COLORS.primary,
            textAlign: 'center'
        },
        emptyText: {
            textAlign: 'center',
            color: COLORS.text
        },
    });
    return styles;
};