import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors/colors';

const CustomHeaderButton = props => {
    return (
        <HeaderButton {...props} IconComponent={Ionicons} iconSize={27} color={COLORS.primary} />
    );
}

export default CustomHeaderButton;
