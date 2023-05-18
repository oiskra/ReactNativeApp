import React, { FC, useCallback, useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as SQLite from "expo-sqlite";
import { colors } from "../constants";
import {
  ISavedCity,
  createFavourite,
  createHistory,
  createTables,
  dropTable,
  getDBConnection,
  getFavourites,
  getHistory,
} from "../db-service";

export const Favourites: FC = () => {
  const [favCities, setFavCities] = useState<ISavedCity[]>([]);

  useEffect(() => {
    const db: SQLite.WebSQLDatabase = getDBConnection();
    createTables(db);
    // createFavourite(db, {city: 'Berlin'})
    getFavourites(db, setFavCities);

    // createHistory(db, {city: 'Berlin'})
    // getHistory(db, setFavCities);
    // dropTable(db, 'favourites');
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
