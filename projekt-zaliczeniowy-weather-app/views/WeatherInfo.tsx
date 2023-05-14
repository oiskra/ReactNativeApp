import React, { FC } from 'react'
import { CurrentWeather } from '../components/CurrentWeather'
import { SafeAreaView } from 'react-native'

export const WeatherInfo : FC = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <CurrentWeather city='Kraków' currentTemp='20°' description='CLOUDY'/>
    </SafeAreaView>
  )
}
