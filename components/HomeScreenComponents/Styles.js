import { COLORS } from '../../constants/colors/colors';
import { StyleSheet, Dimensions } from 'react-native';

export const topListStyle = () => {

    const styles = StyleSheet.create({
        container: {
           
            //height: Dimensions.get('screen').height / 2.7,
            //maxHeight: 300,
            //minHeight: 210
        },
        text: {
            fontSize: Dimensions.get('screen').width * 0.05,
            fontFamily: 'good-times',
            textAlign: 'center',
        }
    });

    return styles;
};

export const gridStyle = darkMode => {

    const styles = StyleSheet.create({
        container: {
            marginVertical: 20,
        },
        title: {
            fontSize: Dimensions.get('screen').width * 0.05,
            fontFamily: 'good-times',
        },
        titlContainer: {
            paddingVertical: 5,
            paddingLeft: 10,
            borderBottomWidth: darkMode ? 1 : 2,
            borderColor: COLORS.primary,
        },
        row: {
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'center',
           
        },
        scrollList: {
            flexDirection: 'row',
            maxHeight: 220
        }
    });

    return styles;
};

export const cardStyle = (darkMode) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 5,
            height: Dimensions.get('screen').height / 3,
            minHeight: 150,
            maxHeight: 225,
            paddingHorizontal: 5,
            marginHorizontal: 10,
            backgroundColor: darkMode ? COLORS.accent2 : COLORS.accent,
            borderRadius: 10,
            alignItems: 'center',
            shadowColor: 'black',
            shadowOpacity: 0.7,
            shadowOffset: { width: 0, height: 0 },
            elevation: 3
        },
        label: {
            textAlign: 'center',
            fontFamily: 'open-sans-m',
            fontSize: Dimensions.get('screen').width * 0.032
        },
        image: {
            height: '100%',
            width: '100%',
            justifyContent: 'flex-end',
            paddingBottom: 10,
            paddingLeft: 3
        }
    });

    return styles;
};