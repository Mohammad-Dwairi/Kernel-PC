import React, { useEffect, useState } from 'react';
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from '../../constants/colors/colors';
import { TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { productImagesStyle } from './Styles';
import AppText from '../SharedComponents/Atomic/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { like, dislike, fetchLikedUsers, fetchDislikedUsers } from '../../store/actions/actions';
import ReactionButtons from './ReactionButtons';

const ProductImages = props => {
    const styles = productImagesStyle();

    

    return (
        <View style={styles.container}>
            <ReactionButtons product={props.product}/>
            <View style={{ flex: 2 }}>
                <SliderBox
                    images={props.product.images}
                    dotColor={COLORS.primary}
                    inactiveDotColor={COLORS.accent}
                    circleLoop
                    resizeMode={'contain'}
                    imageLoadingColor={COLORS.accent}
                    disableOnPress
                />
            </View>

        </View>
    );
};


export default React.memo(ProductImages);
