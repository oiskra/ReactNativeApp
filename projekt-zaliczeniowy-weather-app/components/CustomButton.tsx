import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../constants';

interface ICustomButtonProps {
  title: string;
  onPress?: () => void;
  buttonStyle?: {};
  textStyle?: {};
}

export const CustomButton: FC<ICustomButtonProps> = ({ onPress, title, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.jordyBlue,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'DMSansBold'
  },
});

