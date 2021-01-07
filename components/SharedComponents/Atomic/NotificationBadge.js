import React from 'react';
import {View, StyleSheet} from 'react-native';
import { COLORS } from '../../../constants/colors/colors';
import AppText from './AppText';
const NotifiactionBadge = props => {
    
    return (
        <>  
            {props.number !== 0 ? <View style={{width: 14, height: 14, borderRadius: 7, backgroundColor: COLORS.darkRed, justifyContent: 'center', alignContent: 'center', position:'relative', top: 5, left: 8}}> 
                <AppText style={{color: 'white', textAlign: 'center', fontSize: 10}}>{props.number}</AppText>
            </View> : null}
            {props.children}
            
        </>
    );
};

export default NotifiactionBadge;