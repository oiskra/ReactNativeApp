import React, { FC } from "react";
import { Text, Image, View, StyleSheet } from "react-native"

interface IForecastItemProps {
    date: string;
    icon: string;
    tempMax: number;
    tempMin: number;
}

const dayOfWeek = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]



export const ForecastItem : FC<IForecastItemProps> = ({date, icon, tempMax, tempMin}) => {
    const dayOfWeekNum: number = new Date(date).getDay();
    const formatedDate: string = date.split(' ')[1].substring(0,5);

    return (
      <View testID="forecast-item-wrapper" style={forecastItemStyles.forecastItemContainer}>
        <Text testID="forecast-item-day" style={forecastItemStyles.forecastItemText}>{`${dayOfWeek[dayOfWeekNum]}, ${formatedDate}`}</Text>
        <Image testID="forecast-item-icon"
          source={{uri: `https://openweathermap.org/img/wn/${icon}.png`}} 
          style={forecastItemStyles.forecastItemIcon}
        />
        <Text testID="forecast-item-temp" style={forecastItemStyles.forecastItemText}>{`${tempMax.toFixed(0)}/${tempMin.toFixed(0)}`}</Text>
      </View>
    )
}

const forecastItemStyles = StyleSheet.create({
    forecastItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 250,
        height:50
      },
      forecastItemIcon: {
        height:40,
        width:40
      },
      forecastItemText: {
        fontFamily: 'DMSans'
      }
})