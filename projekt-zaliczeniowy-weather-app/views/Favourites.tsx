import React, { FC, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SQLite from "expo-sqlite";
import { colors } from "../constants";
import {
  ISavedCity,
  getDBConnection,
  getFavourites
} from "../db-service";
import { CustomButton } from "../components/CustomButton";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type FavouriteProps = NativeStackScreenProps<RootStackParamList, 'Favourites'>

export const Favourites: FC<FavouriteProps> = ({navigation}) => {
  const [favCities, setFavCities] = useState<ISavedCity[]>([]);

  useEffect(() => {
    const db: SQLite.WebSQLDatabase = getDBConnection();
    getFavourites(db, setFavCities);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        gap: 10,
        backgroundColor: colors.background,
      }}
    >
      {favCities.map((item) => (
        <CustomButton 
          key={item.id}
          title={item.city}
          buttonStyle={favouritesStyles.favouriteItem}
          textStyle={favouritesStyles.favouriteItemText}
          onPress={() => navigation.push('WeatherInfo', {city: item.city})}  
        /> 
      ))}
    </View>
  );
};

const favouritesStyles = StyleSheet.create({
  favouriteItem: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.jordyBlue,
    marginHorizontal: 10,
    borderRadius: 10,
    height: 50
  },
  favouriteItemText: {
    fontFamily: 'DMSansBold',
    fontSize: 16,
    color: colors.white
  }
}); 