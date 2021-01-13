import React, { useState } from 'react';
import { userNameCardStyles } from './Styles';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import { changeUserName } from '../../store/actions/AuthActions';
import { validateUsername } from '../../validation/UserNameValidation';
import AppText from '../SharedComponents/Atomic/AppText';
import { COLORS } from '../../constants/colors/colors';

const UserNameCard = props => {

    const darkMode = useSelector(state => state.darkMode.isDark);
    const styles = userNameCardStyles(darkMode);

    const [currentUserName, setCurrentUserName] = useState(props.userName);
    const [guideText, setGuideText] = useState('Press on your name if you want to change it.');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const changeUserNameHandler = () => {
        setGuideText('Press on your name if you want to change it.');
        setIsLoading(true);
        dispatch(changeUserName(currentUserName));
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.symbolContainer}>
                <AppText style={styles.symbol}>{props.userName.charAt(0)}</AppText>
            </View>
            <View style={styles.userName_Symbol}>
                <FontAwesome name='edit' size={20} color={COLORS.text} style={{ marginRight: 4 }} />
                <TextInput
                    defaultValue={props.userName}
                    style={styles.userNameText}
                    onChangeText={(text) => setCurrentUserName(text)}
                    maxLength={25}
                />
            </View>

            <AppText style={{ fontSize: 11 }}>{guideText}</AppText>
            {
                currentUserName.trim() === props.userName.trim() ?
                    null :
                    <TouchableOpacity onPress={() => validateUsername(currentUserName) ? setGuideText('Invalid User Name') : changeUserNameHandler()} disabled={isLoading}>
                        {
                            isLoading ? <ActivityIndicator color={COLORS.primary} size='small' style={{ alignSelf: 'flex-end' }} /> :
                                <AppText style={{ fontFamily: 'good-times', color: COLORS.primary, padding: 5, textAlign: 'right' }}>
                                    Apply
                                </AppText>
                        }
                    </TouchableOpacity>
            }
        </View>
    );
};

export default UserNameCard;