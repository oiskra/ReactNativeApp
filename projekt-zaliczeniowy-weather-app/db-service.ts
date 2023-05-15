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


interface Favourites {
  id: number;
  city: string;
}


export const getFavourites = async (db: SQLiteDatabase): Promise<Favourites[]> => {
  try {
    const tableName = 'favourites';
    const favouritesArr: Favourites[] = [];
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


export const addFavourite = async (db: SQLiteDatabase, favourites: Favourites[]) => {
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


interface History {
  id: number;
  city: string;
}


export const getHistory = async (db: SQLiteDatabase): Promise<History[]> => {
  try {
    const tableName = 'history';
    const hisotryArr: History[] = [];
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


export const addHistory = async (db: SQLiteDatabase, history: History[]) => {
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