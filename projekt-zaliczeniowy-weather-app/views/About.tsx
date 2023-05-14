import React, { FC } from 'react'
import { View,  Text, StyleSheet } from 'react-native';
import { colors } from '../constants';

export const About : FC = () => {
  return (
    <View style={aboutStyles.aboutContainer}>
        <Text style={aboutStyles.aboutHeader}>About</Text>
        <Text style={aboutStyles.aboutParagraph}>
            WeatherNow is your go-to weather app, providing accurate and reliable weather information right at your fingertips. 
        </Text>
        <Text style={{fontFamily: 'DMSansMedium'}}>Authors:</Text>
        <Text style={{marginLeft: 3, fontFamily: 'DMSans'}}>Olaf Iskra</Text>
        <Text style={{marginLeft: 3, fontFamily: 'DMSans'}}>Marek Porębski</Text>
    </View>
  );
}


const aboutStyles = StyleSheet.create({
    aboutHeader: {
        fontSize: 30,
        fontFamily: 'DMSansBold'
    },
    aboutParagraph: {
        marginBottom:10,
        fontFamily: 'DMSans'
    },
    aboutContainer: {
        flex: 1,
        justifyContent:'center',
        paddingHorizontal: 20,
        backgroundColor: colors.columbiaBlue
    }

})