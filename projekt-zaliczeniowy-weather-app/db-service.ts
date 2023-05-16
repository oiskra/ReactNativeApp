import { useCallback, useEffect, useState } from 'react';
import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: 'weatherapp.db', location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {

  const tables = ['favourites', 'history'];

  for (let tableName in tables) {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;
    await db.executeSql(query);
  };

};


export interface ISavedCities {
  id: number;
  city: string;
}


export const getFavourites = async (db: SQLiteDatabase): Promise<ISavedCities[]> => {
  try {
    const tableName = 'favourites';
    const favouritesArr: ISavedCities[] = [];
    const results = await db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        favouritesArr.push(result.rows.item(index))
      }
    });
    return favouritesArr;
  } catch (error) {
    throw Error('Failed to get favourites!');
  }
};

export const addFavourite = async (db: SQLiteDatabase, favourites: ISavedCities[]) => {
  const tableName = 'favourites';
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    favourites.map(i => `(${i.id}, '${i.city}')`).join(',');

  return db.executeSql(insertQuery);
};


export const delFavourite = async (db: SQLiteDatabase, id: number) => {
  const tableName = 'favourites';
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};


export const getHistory = async (db: SQLiteDatabase): Promise<ISavedCities[]> => {
  try {
    const tableName = 'history';
    const hisotryArr: ISavedCities[] = [];
    const results = await db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        hisotryArr.push(result.rows.item(index))
      }
    });
    return hisotryArr;
  } catch (error) {
    throw Error('Failed to get history!');
  }
};

export const addHistory = async (db: SQLiteDatabase, history: ISavedCities[]) => {
  const tableName = 'history';
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    history.map(i => `(${i.id}, '${i.city}')`).join(',');

  return db.executeSql(insertQuery);
};


export const delHistory = async (db: SQLiteDatabase, id: number) => {
  const tableName = 'history';
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};


const dbStart = () => {
  const [favouritesArr, setFavourites] = useState<ISavedCities[]>();
  const [historyArr, setHisotry] = useState<ISavedCities[]>();
  const loadDataFromDb = () => useCallback(async () => {

    console.log(favouritesArr)
    try {
      const initFavourites = [{ id: 0, city: 'Kraków' }, { id: 1, city: 'Warsaw' }, { id: 2, city: 'Gdańsk' }]
      const initHistory = [{ id: 0, city: 'Frefeld' }, { id: 1, city: 'Wargla' }, { id: 2, city: 'Gdynia' }]
      const db = await getDBConnection();
      await createTables(db)
      const storedFavourites = await getFavourites(db);
      const storedHistory = await getHistory(db);

      if (storedFavourites.length)
        setFavourites(storedFavourites)
      else {
        await addFavourite(db, initFavourites)
        setFavourites(initFavourites)
      }

      if (storedHistory.length)
        setHisotry(storedHistory)
      else {
        await addHistory(db, initHistory)
        setHisotry(initHistory)
      }
    } catch (err) {
      return err
    }

  }, []);

  useEffect(() => {
    loadDataFromDb();
  }, [loadDataFromDb]);
}
