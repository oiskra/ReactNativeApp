import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { colors } from '../constants';
import { ICities } from '../interfaces/ICities';
import { ListItem } from './ListItem';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

interface ISearchFilterProps {
    input: string;
    cities: ICities | undefined;
    active?: boolean;
    selectedCityHandler: (city: string) => void
}

export const SearchFilter: FC<ISearchFilterProps> = ({ input, cities, selectedCityHandler }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (input == '') { setActive(false); }
        else { setActive(true); }
    }, [input])

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
        <>
            {
                active
                &&
                <View style={!active ? styles.none : styles.flex}>
                    <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        {cities?.data.map((city) => {
                            if (input !== '' && city.city.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())) {
                                return <ListItem addictionalStyles={{}} key={city.city} listItemText={city.city} onListItemPress={() => selectedCityHandler(city.city)} />
                            }
                            return
                        })}

                    </ScrollView>
                </View>
            }
        </>
    );

};

const styles = StyleSheet.create({

    none: {
        display: 'none',
    },

    flex: {
        zIndex: 1000,
        top: (windowHeight * 0.12 + 60),
        width: '95%',
        position: 'absolute',
        display: 'flex',
        marginHorizontal: 10,
        height: 85,
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
        backgroundColor: colors.background,
        elevation: 20,
        shadowColor: colors.oxfordBlue,
    },


});