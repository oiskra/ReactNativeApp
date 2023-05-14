import React, { FC } from 'react';
import { StyleSheet, Platform, ScrollView } from 'react-native';
import { colors } from '../constants';
import { Cities } from '../interfaces/cities';
import { ListItem } from './ListItem';


interface ISearchFilterProps {
    input: string;
    cities: Cities | undefined;
    active: boolean;
}

export const SearchFilter: FC<ISearchFilterProps> = ({ input, cities, active = false, }) => {
    return (
        <ScrollView
            style={active ? styles.none : styles.flex}
        >
            {!active && cities?.data.map((city, i) => {
                return i < 100 && <ListItem listItemText={city.city} />
            })}
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    none: {
        display: 'none',
    },

    flex: {
        zIndex: 100,
        elevation: (Platform.OS === 'android') ? 50 : 0,
        display: 'flex',
        position: 'absolute',
        width: '100%',
        maxHeight: 100,
        top: 50,
        borderWidth: 2,
        borderColor: colors.jordyBlue,
        borderRadius: 5,
        backgroundColor: colors.white
    },
});

