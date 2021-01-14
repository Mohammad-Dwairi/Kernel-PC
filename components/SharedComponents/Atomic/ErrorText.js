import React from 'react';
import { Text } from 'react-native';

const ErrorText = props => <Text style={{color: 'crimson', textAlign: 'center'}}>{props.children}</Text>;

export default ErrorText;