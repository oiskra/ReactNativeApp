import { useState } from 'react';
import * as SQLite from 'expo-sqlite';

export interface ISavedCity {
    id?: number;
    city: string;
  }

export const getDBConnection = (): SQLite.WebSQLDatabase => {
  return SQLite.openDatabase('weatherapp');
};

export const createTables = (db: SQLite.WebSQLDatabase): void => {

  const tables = ['favourites', 'history'];
  db.transaction(tx => {
    for (let tableName in tables) {
        const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT NOT NULL);`;
        tx.executeSql(query);
    }; 
  })
};

export const getFavourites = (db: SQLite.WebSQLDatabase): ISavedCity[] => {
    let favourites: ISavedCity[] = [];

    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM favourites',
            [],
            (tr, res) => {
                console.log('get', res.rows._array);
                favourites = res.rows._array;
            },
            (tr, err) => {console.log('get', err); return true;}
        );           
    });

    return favourites;
};

export const createFavourite = (db: SQLite.WebSQLDatabase, favourite: ISavedCity): void => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO favourites (city) values ("${favourite.city}")`,
            [],
            (tr, res) => console.log('created'),
            (tr, err) => {console.log('create', err); return true;}
        );
    });
};


export const delFavourite = async (db: SQLite.WebSQLDatabase, id: number): Promise<void> => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE from favourites where id = ${id}`
        );
    });
};




