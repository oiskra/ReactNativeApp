import React, { FC, useCallback, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import * as SQLite from 'expo-sqlite'
import { colors } from '../constants';
import { ISavedCity, createFavourite, createTables, getDBConnection, getFavourites } from '../db-service';



export const Favourites : FC = () => {
    const [favCities, setFavCities] = useState<ISavedCity[]>([]);

    // useEffect(() => {
        
    //     const db = SQLite.openDatabase('nameDB');

        
    //     db.transaction(tx => {
    //         tx.executeSql(
    //             'CREATE TABLE IF NOT EXISTS favourites (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT)',
    //             [],
    //             (tr, res) => console.log(res),
    //             (tr, err) => {console.log('create', err); return true}
    //         )   
    //     });

    //     // db.transaction(tx => {
    //     //     tx.executeSql(
    //     //         'INSERT INTO favourites (city) VALUES ("Berlin")',
    //     //         [],
    //     //         (tr, res) => console.log(res),
    //     //         (tr, err) => {console.log(err); return true}
    //     //     );
            
    //     // }, (err)=> console.log(err), () => console.log('DZIALA'));


    // },[])

    useEffect(() => {

        const db: SQLite.WebSQLDatabase = getDBConnection();
        createTables(db);
        createFavourite(db, {city: 'Berlin'})
        getFavourites(db, setFavCities);

    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.jordyBlue}}>
            <Text>Hello</Text>
            { favCities.map(item => <Text key={item.id}>{item.city}</Text>) }
        </View>
    )
}
