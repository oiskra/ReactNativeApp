import React, { FC } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { colors } from '../constants';
import { List } from '../interfaces/IHourlyWeather';
import { ForecastItem } from './ForecastItem';

interface IForecastWeatherProps {
  forecast: List[] | undefined
}

export const ForecastWeather : FC<IForecastWeatherProps> = ({forecast}) => {
  return (
    <View testID='weather-forecast-wrapper' style={forcastWeatherStyles.forcastWeatherContainer}>
      <View style={forcastWeatherStyles.hourlyforecastContainer}>
        <ScrollView
          testID='weather-forecast-scrollview'
          style={{flex:1}}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          showsVerticalScrollIndicator={false}
        >
          {forecast?.map((item, i) =>
            <ForecastItem
              key={i}
              date={item.dt_txt}
              icon={item.weather[0].icon}
              tempMax={item.main.temp_max}
              tempMin={item.main.temp_min}
            />)}
        </ScrollView>
      </View>
    </View>
  )
}

const forcastWeatherStyles = StyleSheet.create({
    forcastWeatherContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      padding: 10,
    },
    hourlyforecastContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 30
    },

});

