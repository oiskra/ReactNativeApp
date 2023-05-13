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
        <Text style={{fontWeight: 'bold'}}>Authors:</Text>
        <Text style={{marginLeft: 3}}>Olaf Iskra</Text>
        <Text style={{marginLeft: 3}}>Marek Porębski</Text>
    </View>
  );
}


const aboutStyles = StyleSheet.create({
    aboutHeader: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    aboutParagraph: {
        marginBottom:10
    },
    aboutContainer: {
        flex: 1, 
        justifyContent:'center',
        paddingHorizontal: 20,
        backgroundColor: colors.columbiaBlue 
    }

})