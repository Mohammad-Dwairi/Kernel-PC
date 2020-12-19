import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import AppText from '../../../SharedComponents/Atomic/AppText';
import { cardStyle } from '../../Styles';

const Card = props => {
    
    const darkMode = useSelector(state => state.darkMode.isDark);
    const navigation = useNavigation();
    const styles = cardStyle(darkMode);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{ ...styles.container, ...props.style }}
            onPress={() => navigation.navigate('ProductsScreen', { id: props.id, categoryName: props.name })}>

            <ImageBackground
                style={{ ...styles.image, alignItems: props.textLeft ? 'flex-start' : 'center', }}
                source={props.image}
                resizeMode='contain'>
                <AppText style={styles.label}>{props.name}</AppText>
            </ImageBackground>

        </TouchableOpacity>
    );
};


export default Card;