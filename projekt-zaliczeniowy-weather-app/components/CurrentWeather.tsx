import React, { FC, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

interface ICurrentWeatherProps {
    city: string;
    currentTemp: string;
    description: string;
    weatherIcon: string;
}

export const CurrentWeather : FC<ICurrentWeatherProps> = ({city, currentTemp, description, weatherIcon}) => {
    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    return (
        <View>
            <View>
                <Text>{city}</Text>
                <Image source={!isFavourite ? require('../assets/heart-ol.png') : require('../assets/heart.png')}></Image>
            </View>
            <View>
                <Text></Text>
                <Text></Text>
            </View>
            <Image source={require(weatherIcon)}></Image>
        </View>
    )
}

const currentWeatherStyles = StyleSheet.create({
    currentWeatherContainer: {

    }
});
