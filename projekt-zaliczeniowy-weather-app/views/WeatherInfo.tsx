import React, { FC, useEffect, useState } from 'react'
import { CurrentWeather } from '../components/CurrentWeather'
import { SafeAreaView } from 'react-native'
import { apiKey } from '../constants'
import { ICurrentWeather } from '../interfaces/ICurrentWeather'

export const WeatherInfo : FC = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState<ICurrentWeather | undefined>(undefined);

  useEffect(() => {
    Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${'Kraków'}&units=metric&appid=${apiKey}`)
    ])
    .then(([currentWeatherJson]) => {
      return Promise.all([
        currentWeatherJson.json()
      ])
    })
    .then(([currentWeather]) => {
      setCurrentWeatherData(currentWeather);
    });
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      <CurrentWeather 
        city={currentWeatherData?.name} 
        currentTemp={currentWeatherData?.main.temp.toFixed(0) + '°'} 
        description={currentWeatherData?.weather[0].description}
        weatherIcon={currentWeatherData?.weather[0].icon}
      />
    </SafeAreaView>
  );
}
