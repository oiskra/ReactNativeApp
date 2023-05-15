import React, { FC, useEffect, useState } from 'react'
import { CurrentWeather } from '../components/CurrentWeather'
import { ActivityIndicator, SafeAreaView, Text } from 'react-native'
import { colors, weatherApiKey } from '../constants'
import { ICurrentWeather } from '../interfaces/ICurrentWeather'
import { ForecastWeather } from '../components/ForecastWeather'
import { IHourlyWeather } from '../interfaces/IHourlyWeather'

export const WeatherInfo : FC = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState<ICurrentWeather | undefined>(undefined);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<IHourlyWeather | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${'Kraków'}&units=metric&appid=${weatherApiKey}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${'Kraków'}&units=metric&appid=${weatherApiKey}`)
    ])
    .then(([currentWeatherJson, hourlyWeatherJson]) => {
      return Promise.all([
        currentWeatherJson.json(),
        hourlyWeatherJson.json()
      ])
    })
    .then(([currentWeather, hourlyWeather]) => {
      setCurrentWeatherData(currentWeather);
      setHourlyWeatherData(hourlyWeather);
      setIsLoading(false);
    })
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      {isLoading ?
        <ActivityIndicator 
          size='large'
          color={colors.glaucous}
        />
        :
        <>
          <CurrentWeather 
            city={currentWeatherData?.name} 
            currentTemp={currentWeatherData?.main.temp.toFixed(0) + '°'} 
            description={currentWeatherData?.weather[0].description}
            weatherIcon={currentWeatherData?.weather[0].icon}
          />
          <ForecastWeather 
            forecast={hourlyWeatherData?.list}
          />
        </>
      }
    </SafeAreaView>
  );
}
