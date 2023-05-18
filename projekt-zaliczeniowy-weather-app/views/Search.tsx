import { FC } from "react";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { colors } from '../constants';
import { ICities } from '../interfaces/ICities';
import { ListItem } from "../components/ListItem";
import { SearchFilter } from "../components/SearchFilter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { ISavedCity, createHistory, dropTable, getDBConnection, getHistory } from "../db-service";
import * as SQLite from 'expo-sqlite'
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type SearchProps = NativeStackScreenProps<RootStackParamList, 'Search'>

export const Search: FC<SearchProps> = ({ navigation }) => {

    const [input, setInput] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [data, setData] = useState<ICities | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const [historyCities, sethistoryCities] = useState<ISavedCity[]>([]);

    useEffect(() => {
        fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`)
            .then(res => res.json())
            .then(
                (result) => {
                    setLoading(false);
                    setData(result);
                },
                (error) => {
                    setLoading(false);
                }
            )

        const db: SQLite.WebSQLDatabase = getDBConnection();
        getHistory(db, sethistoryCities);
        // dropTable(db, 'history');

    }, []);

    const selectedCityHandler = (city: string): void => {
        setSelectedCity(city);
        setInput(city);
    }
    const onSearchPress = () => {
        if (input !== '') {
            navigation.push('WeatherInfo', { city: selectedCity });

            if(!historyCities.find(e => e.city === selectedCity)){
                const db: SQLite.WebSQLDatabase = getDBConnection();
                createHistory(db, { city: selectedCity });
                sethistoryCities([...historyCities, { city: selectedCity}]);
            }
            setInput('');
            setSelectedCity('');
        }
    }

    const debounceOnChange = (value: any, delay = 500) => {

        const [debounceValue, setDebounceValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebounceValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);

        return debounceValue
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.textInput}
                    value={input}
                    placeholder='Enter city...'
                    onChangeText={setInput}
                />
                <TouchableOpacity onPress={onSearchPress}>
                    <Image
                        style={styles.searchIcon}
                        source={require('../assets/search.png')}
                    />
                </TouchableOpacity>
            </View>
            <SearchFilter
                input={debounceOnChange(input)}
                selectedCityHandler={selectedCityHandler}
                cities={data}
                active={false}
            />

            <View style={styles.historyContainer}>
                {historyCities.map(item => <ListItem key={item.city} listItemText={item.city} onListItemPress={() => selectedCityHandler(item.city)}/>)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        paddingTop: windowHeight*0.11,
        flex: 1,
        backgroundColor: colors.columbiaBlue,
        justifyContent: 'center',
    },

    searchBar: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    textInput: {
        fontFamily: 'DMSans',
        paddingLeft: 10,
        flexGrow: 1,
        height: 40,
    },

    searchIcon: {
        marginRight: 10,
        width: 15,
        height: 15,
    },


    historyContainer: {
        zIndex: -1,
        flexGrow: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 5,
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
        color: colors.white,
        fontFamily: 'DMSans'
    }

});

