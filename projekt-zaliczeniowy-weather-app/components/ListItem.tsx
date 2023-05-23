import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { FC } from 'react';
import React from 'react';
import { colors } from '../constants';

interface IListItemProps {
    addictionalStyles: object;
    listItemText: string;
    onListItemPress: () => void;
}

export const ListItem : FC<IListItemProps> = ({addictionalStyles, listItemText, onListItemPress}) => {

    return (
        <TouchableOpacity style={[styles.listItem, addictionalStyles]} onPress={() => onListItemPress()}>
            <Text style={{fontFamily: 'DMSans'}}>{listItemText}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

    listItem: {
        zIndex: -1,
        color: colors.white,
        padding: 5,
    }

});
