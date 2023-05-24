import React, { FC, useEffect, useState } from 'react'
import { CurrentWeather } from '../components/CurrentWeather'
import { ActivityIndicator, SafeAreaView, View } from 'react-native'
import { colors, weatherApiKey } from '../constants'
import { ICurrentWeather } from '../interfaces/ICurrentWeather'
import { ForecastWeather } from '../components/ForecastWeather'
import { IHourlyWeather } from '../interfaces/IHourlyWeather'
import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {SettingsSingleton} from '../SettingsSingleton'

type WeatherInfoProps = NativeStackScreenProps<RootStackParamList, 'WeatherInfo'>

export const WeatherInfo : FC<WeatherInfoProps> = ({ navigation, route }) => {
  const [currentWeatherData, setCurrentWeatherData] = useState<ICurrentWeather | undefined>(undefined);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<IHourlyWeather | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const city = route.params.city;
  const settings = SettingsSingleton.getInstance();

  useEffect(() => {
    Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${settings.units}&appid=${weatherApiKey}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${settings.units}&appid=${weatherApiKey}`)
    ])
    .then(([currentWeatherJson, hourlyWeatherJson]) => {
      return Promise.all([
        currentWeatherJson.json(),
        hourlyWeatherJson.json()
      ])
    })
    .then(([currentWeather, hourlyWeather]) => {
      
      console.log(currentWeather.cod)
      if(currentWeather.cod !== 200) {
        throw Error("City's forecast is unavailable.")
      }
      setCurrentWeatherData(currentWeather);
      setHourlyWeatherData(hourlyWeather);
      setIsLoading(false);
    })
    .catch((err: Error) => navigation.push('Error', {errorMsg: err.message}))
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      {isLoading ?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background}}>
          <ActivityIndicator
            size='large'
            color={colors.glaucous}
          />
        </View>
        :
        <>
          <CurrentWeather
            city={currentWeatherData!.name}
            currentTemp={`${currentWeatherData!.main.temp.toFixed(0)}°${settings.units === 'metric' ? 'C' : 'F'}`}
            description={currentWeatherData!.weather[0].main}
            weatherIcon={currentWeatherData!.weather[0].icon}
          />
          <ForecastWeather
            forecast={hourlyWeatherData?.list}
          />
        </>
      }
    </SafeAreaView>
  );
}
