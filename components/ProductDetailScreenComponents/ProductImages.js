import React from 'react';
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from '../../constants/colors/colors';
import { View } from 'react-native';
import { productImagesStyle } from './Styles';
import ReactionButtons from './ReactionButtons';

const ProductImages = props => {

    const styles = productImagesStyle();

    return (
        <View style={styles.container}>
            <ReactionButtons product={props.product} />
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
