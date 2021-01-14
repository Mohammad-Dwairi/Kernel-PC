import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors/colors';

export const inputStyles = (darkMode) => {

    const styles = StyleSheet.create({
        container: {
            marginVertical: 30
        },
        input: {
            marginVertical: 5,
            paddingVertical: 7,
            fontSize: 16,
            //borderBottomWidth: 1,
            //borderBottomColor: darkMode ? COLORS.primary : COLORS.dark,
            color: darkMode ? COLORS.accent : COLORS.text,
            alignSelf: 'center',
            width: '100%'
        }
    });

    return styles;
};