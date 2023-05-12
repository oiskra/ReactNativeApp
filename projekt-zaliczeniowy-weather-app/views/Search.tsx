import { FC } from "react";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import { colors } from '../constants';
import { ListItem } from "../components/ListItem";
import { Cities } from '../interfaces/cities';

export const Search: FC = () => {

    const [text, setInput] = useState('');
    const [data, setData] = useState<Cities|undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`)
            .then(res => res.json())
            .then(
                (result) => {
                    setLoading(false);
                    setData(result);
                    console.log(data!.data[0].city)
                },
                (error) => {
                    setLoading(false);
                    setError(error);
                }
            )
    }, []);


    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.textInput}
                    value={text}
                    placeholder='Enter city...'
                    onChangeText={setInput}
                />
                <Image style={styles.searchIcon} source={require('../assets/favicon.png')} />
            </View>

            <View style={styles.text}>
                <>
                    {loading && <Text>Loading..</Text>}
                    {!loading && data!.data.forEach((city, i) => { 
                        return i<100 && <Text>{city.city}</Text>
                    })}
                </>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.jordyBlue,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchBar: {
        width: '90%',
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
    },

    textInput: {
        width: '100%',
        height: 40,
        padding: 10,
        borderWidth: 2,
        borderColor: colors.columbiaBlue,
        borderRadius: 5,
    },

    searchIcon: {
        position: 'absolute',
        right: 10,
        top: 8,
        width: 25,
        height: 25,
    },

    text: {
        width: '90%',
        height: '70%',
        margin: 10,
        padding: 15,
        borderWidth: 2,
        borderColor: colors.columbiaBlue,
        borderRadius: 5
    }

});