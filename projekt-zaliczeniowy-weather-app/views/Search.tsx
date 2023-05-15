import { FC } from "react";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { colors } from '../constants';
import { Cities } from '../interfaces/cities';
import { ListItem } from "../components/ListItem";
import { SearchFilter } from "../components/SearchFilter";

export const Search: FC = () => {

    const [input, setInput] = useState('');
    const [data, setData] = useState<Cities | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                    setError(error);
                }
            )
    }, []);


    const onPress = () => console.log(`Search ${input}`);

    const debounceOnChange = (value: any, delay = 1000) => {

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
                    style={[styles.textInput, {fontFamily: 'DMSans'}]}
                    value={input}
                    placeholder='Enter city...'
                    onChangeText={setInput}
                />
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={onPress}
                >
                    <Image
                        style={styles.searchIcon}
                        source={require('../assets/search.png')}
                    />
                </TouchableOpacity>
                <SearchFilter input={debounceOnChange(input)} cities={data} active={false} />
            </View>

            <View style={styles.text}>
                <Text style={{fontFamily: 'DMSans'}}>Historia miast</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.columbiaBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchBar: {
        width: '90%',
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
    },

    textInput: {
        width: '100%',
        height: 40,
        padding: 10,
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
    },

    touchableOpacity: {
        position: 'absolute',
        right: 15,
        top: 13,
    },

    searchIcon: {
        width: 15,
        height: 15,
    },


    text: {
        zIndex: -1,
        width: '90%',
        height: '70%',
        margin: 10,
        padding: 15,
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
        color: colors.white,
        fontFamily: 'DMSans'
    }

});

function debounce(updateInput: (e: any) => void, arg1: number) {
    throw new Error("Function not implemented.");
}
