import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../constants';
import { ISavedCity, createFavourite, deleteFavourite, getDBConnection, getFavourites } from '../db-service';

interface ICurrentWeatherProps {
    city: string;
    currentTemp: string;
    description: string;
    weatherIcon: string;
}
//{city, currentTemp, description, weatherIcon}
export const CurrentWeather : FC<ICurrentWeatherProps> = (props) => {
    const [isFavourite, setIsFavourite] = useState<boolean>(false);
    const [favCities, setFavCities] = useState<ISavedCity[]>([]);
    
    const favouriteButtonHandler = (): void => {
        const db = getDBConnection();
        if(isFavourite) {
            setIsFavourite(false);
            deleteFavourite(db, props.city);
            return;
        }
        
        setIsFavourite(true)
        createFavourite(db, {city: props.city});
        return;
    }

    useEffect(() => {
        const db = getDBConnection();
        getFavourites(db, setFavCities);
    }, []);

    useEffect(() => {
        console.log('OHIO ONIICHAN', favCities);
        const exists: boolean = favCities?.find(item => item.city === props.city) !== undefined;
        setIsFavourite(exists);

    }, [favCities])

    

    
    return (
        <View style={currentWeatherStyles.currentWeatherContainer}>
            <View style={currentWeatherStyles.currentWeatherHeader}>
                <Text style={currentWeatherStyles.headerText}>{props.city}</Text>
                <TouchableOpacity onPress={favouriteButtonHandler}>
                    <Image 
                        source={!isFavourite ? require('../assets/heart-ol.png') : require('../assets/heart.png')} 
                        style={!isFavourite ? currentWeatherStyles.headerFavouriteImage : currentWeatherStyles.headerNonFavouriteImage} 
                    />
                </TouchableOpacity>
            </View>
            <View style={currentWeatherStyles.tempContainer}>
                <Text style={currentWeatherStyles.temperature}>{props.currentTemp}</Text>
                <Text style={currentWeatherStyles.description}>{props.description?.toUpperCase()}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                    source={{uri: `https://openweathermap.org/img/wn/${props.weatherIcon}@4x.png`}}
                    resizeMethod='scale'
                    style={{
                        width: 250,
                        height: 250,
                        maxHeight: 200
                    }}
                />
            </View>

        </View>
    )
}

const currentWeatherStyles = StyleSheet.create({
    currentWeatherContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.background,
        paddingTop: 100,
    },
    currentWeatherHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: 50  ,
        marginHorizontal: 20,
    },
    headerText: {
        fontSize: 40,
        fontFamily: 'DMSans'   
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
        fontSize: 100,
        fontFamily: 'DMSans'   
    },
    description: {
        fontSize: 20,
        fontFamily: 'DMSans'   
    },
    tempContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
        gap: 10,
        maxHeight: 100
    }
});
