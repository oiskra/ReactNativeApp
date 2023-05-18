import { StyleSheet, Text, View } from 'react-native';
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
        <View style={[styles.listItem, addictionalStyles]}>
            <Text style={{fontFamily: 'DMSans'}} onPress={() => onListItemPress()}>{listItemText}</Text>
        </View>
    );
}


const styles = StyleSheet.create({

    listItem: {
        zIndex: -1,
        color: colors.white,
        padding: 5,
    }

});
