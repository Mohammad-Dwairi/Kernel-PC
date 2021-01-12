import React, { useCallback, useEffect, useState } from 'react';
import { View, Switch } from 'react-native';
import AppText from '../../Atomic/AppText';
import { useDispatch, useSelector } from 'react-redux';
import { setDark } from '../../../../store/actions/AppActions';
import { COLORS } from '../../../../constants/colors/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { darkModeSwitchStyle } from '../Styles';

const ModeSwitch = props => {

    const darkMode = useSelector(state => state.darkMode.isDark);
    const [isDark, setIsDark] = useState(darkMode);
    const dispatch = useDispatch();

    const setDarkHandler = useCallback(() => {
        dispatch(setDark(isDark));
    }, [isDark]);

    useEffect(() => {
        setDarkHandler();
    });

    const styles = darkModeSwitchStyle(darkMode);

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name='theme-light-dark' size={30} color={COLORS.accent} />
            <AppText style={styles.label}>Dark Mode</AppText>
            <Switch
                value={isDark}
                onValueChange={(newVal) => setIsDark(newVal) }
                trackColor={{ true: COLORS.text }}
                thumbColor={COLORS.accent}
                ios_backgroundColor
            />
        </View>
    );
};

export default ModeSwitch;