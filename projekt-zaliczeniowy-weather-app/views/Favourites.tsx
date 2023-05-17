import React, { FC, useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as SQLite from "expo-sqlite";
import { colors } from "../constants";
import {
  ISavedCity,
  getDBConnection,
  getFavourites
} from "../db-service";

export const Favourites: FC = () => {
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
        alignItems: "center",
        backgroundColor: colors.columbiaBlue,
      }}
    >
      <Text>Hello</Text>
      {favCities.map((item) => (
        <Text key={item.id}>{item.city}</Text>
      ))}
    </View>
  );
};
