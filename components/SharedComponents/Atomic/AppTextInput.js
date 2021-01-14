import React, {useState} from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AppText from './AppText';
import { appTextInputStyles } from './Styles';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../constants/colors/colors';
import ErrorText from './ErrorText';


const AppTextInput = props => {

    const darkMode = useSelector(state => state.darkMode.isDark);

    const styles = appTextInputStyles(darkMode);

    const [showPassword, setShowPassword] = useState(false);

    let showPasswordButton = null;

    if (props?.secureTextEntry) {
        if (props.value?.length !== 0) {
            showPasswordButton = (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Entypo name={showPassword ? 'eye-with-line' : 'eye'} size={25} color={COLORS.primary} />
                </TouchableOpacity>
            );
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.labelContainer}>
                    <AppText style={styles.label}>{props.label}</AppText>
                    {showPasswordButton}
                </View>
                <View style={styles.inputContainer}>
                    <Entypo name={props.icon} size={23} color={COLORS.primary} />
                    <TextInput
                        {...props}
                        style={styles.input}
                        selectionColor={COLORS.primary}
                        secureTextEntry={!showPassword && props.secureTextEntry}
                        
                    />
                </View>
            </View>
            <ErrorText>{props.error}</ErrorText>
        </>

    );
};

export default AppTextInput;