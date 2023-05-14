import React, { FC, useState } from 'react'
import { View, Text, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import { colors } from '../constants';

interface ICurrentWeatherProps {
    city?: string;
    currentTemp?: string;
    description?: string;
    weatherIcon?: string;
}

export const CurrentWeather : FC<ICurrentWeatherProps> = ({city, currentTemp, description, weatherIcon}) => {
    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    return (
        <View style={currentWeatherStyles.currentWeatherContainer}>
            <View style={currentWeatherStyles.currentWeatherHeader}>
                <Text style={currentWeatherStyles.headerText}>{city}</Text>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <Image 
                        source={!isFavourite ? require('../assets/heart-ol.png') : require('../assets/heart.png')} 
                        style={!isFavourite ? currentWeatherStyles.headerFavouriteImage : currentWeatherStyles.headerNonFavouriteImage} 
                    />
                </TouchableOpacity>
            </View>
            <View style={currentWeatherStyles.tempContainer}>
                <Text style={currentWeatherStyles.temperature}>{currentTemp}</Text>
                <Text style={currentWeatherStyles.description}>{description}</Text>
            </View>
            {/* <Image source={require(weatherIcon!)}></Image> */}
        </View>
    )
}

const currentWeatherStyles = StyleSheet.create({
    currentWeatherContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.columbiaBlue,
        paddingTop: 100

    },
    currentWeatherHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: 50  ,
        marginHorizontal: 20   
    },
    headerText: {
        fontSize: 40,
    },
    headerFavouriteImage: {
        width: 35,
        height: 35,
    },
    headerNonFavouriteImage: {
        width: 35,
        height: 40,
    },
    temperature: {
        fontSize: 100
    },
    description: {
        fontSize: 20
    },
    tempContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        gap: 10
    }
});
