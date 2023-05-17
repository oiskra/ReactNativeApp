import { FC } from "react";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { colors } from '../constants';
import { ICities } from '../interfaces/ICities';
import { ListItem } from "../components/ListItem";
import { SearchFilter } from "../components/SearchFilter";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type SearchProps = NativeStackScreenProps<RootStackParamList, 'Search'>

export const Search: FC<SearchProps> = ({navigation}) => {

    const [input, setInput] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [data, setData] = useState<ICities | undefined>(undefined);
    const [loading, setLoading] = useState(true);

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
    }, []);

    console.log(selectedCity);

    const selectedCityHandler = (city: string) : void => {
        setSelectedCity(city);
        setInput(city);
    }
    const onSearchPress = () => navigation.push('WeatherInfo', {city: selectedCity})

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
                <Text style={{fontFamily: 'DMSans'}}>Historia miast</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.columbiaBlue,
        // alignItems: 'center',
        justifyContent: 'center',
    },

    searchBar: {
        margin: 10,
        marginTop: 80,
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
        padding: 15,
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
        color: colors.white,
        fontFamily: 'DMSans'
    }

});

