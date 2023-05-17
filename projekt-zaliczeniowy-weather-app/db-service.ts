import * as SQLite from 'expo-sqlite';

export interface ISavedCity {
    id?: number;
    city: string;
}

export const getDBConnection = (): SQLite.WebSQLDatabase => {
    return SQLite.openDatabase('weatherapp');
};

export const createTables = (db: SQLite.WebSQLDatabase): void => {
    db.transaction(tx => {
        const queryFav = `CREATE TABLE IF NOT EXISTS favourites (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT NOT NULL);`;
        const queryHis = `CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT NOT NULL);`;
        tx.executeSql(queryFav);
        tx.executeSql(queryHis);
    })
};

export const getFavourites = (
    db: SQLite.WebSQLDatabase,
    callback: (value: ISavedCity[]) => void): void => {

    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM favourites',
            [],
            (tr, res) => {
                //console.log('get', res.rows._array);
                callback(res.rows._array);
            },
            (tr, err) => { console.log('get', err); return true; }
        );
    });

};

export const createFavourite = (db: SQLite.WebSQLDatabase, favourite: ISavedCity): void => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO favourites (city) values ("${favourite.city}")`,
            [],
            (tr, res) => console.log('created'),
            (tr, err) => { console.log('create', err); return true; }
        );
    });
};


export const delFavourite = (db: SQLite.WebSQLDatabase, id: number): void => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE from favourites where id = ${id}`
        );
    });
};


export const getHistory = (
    db: SQLite.WebSQLDatabase,
    callback: (value: ISavedCity[]) => void): void => {

    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM history',
            [],
            (tr, res) => {
                console.log('get', res.rows._array);
                callback(res.rows._array);
            },
            (tr, err) => { console.log('get', err); return true; }
        );
    });

};

export const createHistory = (db: SQLite.WebSQLDatabase, history: ISavedCity): void => {
    if(history.city == '')
        return
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO history (city) values ("${history.city}")`,
            [],
            (tr, res) => console.log('created'),
            (tr, err) => { console.log('create', err); return true; }
        );
    });
};

export const delHistory = (db: SQLite.WebSQLDatabase, id: number): void => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE from hisotry where id = ${id}`
        );
    });
};

export const dropTable = (db: SQLite.WebSQLDatabase, tableName: string): void => {
    db.transaction(tx => {
        tx.executeSql(
            `DROP TABLE IF EXISTS ${tableName}`,
            [],
            (tr, res) => console.log('dropped'),
            (tr, err) => { console.log('drop', err); return true; }
        );
    });
}
