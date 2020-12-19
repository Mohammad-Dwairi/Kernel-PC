import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors/colors';

export const inputStyles = (darkMode) => {

    const styles = StyleSheet.create({
        container: {
            marginVertical: 30
        },
        input: {
            padding: 10,
            fontSize: 18,
            borderBottomWidth: 1,
            borderBottomColor: darkMode ? COLORS.primary : COLORS.dark,
            color: darkMode ? COLORS.accent : COLORS.text,
            alignSelf: 'center',
            width: '100%'
        }
    });

    return styles;
};