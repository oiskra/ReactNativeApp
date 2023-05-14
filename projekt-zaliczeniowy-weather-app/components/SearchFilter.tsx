import React, { FC, useState } from 'react';
import { StyleSheet, Platform, ScrollView, View, FlatList } from 'react-native';
import { colors } from '../constants';
import { Cities } from '../interfaces/cities';
import { ListItem } from './ListItem';


interface ISearchFilterProps {
    input: string;
    cities: Cities | undefined;
    active?: boolean;
}



export const SearchFilter: FC<ISearchFilterProps> = ({ input, cities }) => {
    const [active, setActive] = useState(false);

    return (
        <ScrollView
            style={styles.flex}
        >
            {cities?.data.map((city) => {
                if(input !== '' && city.city.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())){
                    return <ListItem key={city.city} listItemText={city.city} />
                }else
                    return
            })}

        </ScrollView>

    );
};

const styles = StyleSheet.create({

    none: {
        display: 'none',
    },

    flex: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        top: 50,
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
        backgroundColor: colors.white,
    },


});