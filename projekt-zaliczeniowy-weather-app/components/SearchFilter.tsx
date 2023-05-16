import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Platform, ScrollView, View, FlatList } from 'react-native';
import { colors } from '../constants';
import { ICities } from '../interfaces/ICities';
import { ListItem } from './ListItem';


interface ISearchFilterProps {
    input: string;
    cities: ICities | undefined;
    active?: boolean;
    selectedCityHandler: (city: string) => void
}



export const SearchFilter: FC<ISearchFilterProps> = ({ input, cities, selectedCityHandler }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        if(input == '') {setActive(false);}
        else {setActive(true);}
    }, [input])

    return (
        <>
            {
            active 
            &&
            <View style={!active ? styles.none : styles.flex}>
                <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                    {cities?.data.map((city) => {
                        if (input !== '' && city.city.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())) {
                            return <ListItem key={city.city} listItemText={city.city} onListItemPress={() => selectedCityHandler(city.city)}/>
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
        display: 'flex',
        marginHorizontal: 10,
        marginBottom: 10,
        height: 115,
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
    },


});