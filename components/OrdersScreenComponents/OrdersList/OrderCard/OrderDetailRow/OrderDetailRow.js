import React from 'react';
import { View } from 'react-native';
import AppText from '../../../../SharedComponents/Atomic/AppText';
import { COLORS } from '../../../../../constants/colors/colors';
import { AntDesign } from '@expo/vector-icons';
import { orderDetailRowStyle } from '../../../Styles';


const OrderDetailRow = props => {
    const styles = orderDetailRowStyle();

    return (
        <View style={styles.detailRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <AntDesign name='caretright' color={COLORS.primary} />
                <AppText style={styles.label}>{props.label}</AppText>
            </View>
            <View style={styles.values}>
                {
                    props.label == 'Product' || props.label === 'Quantity' ?
                        <AppText style={styles.value}>{props.value}</AppText>
                        :
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <AppText style={styles.currnecy}>JOD </AppText>
                            <AppText style={styles.value}>{props.value}</AppText>
                        </View>
                }
            </View>
        </View>
    );
};

export default OrderDetailRow;