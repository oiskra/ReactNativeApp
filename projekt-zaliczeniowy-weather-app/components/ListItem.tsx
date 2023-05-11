import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import React from 'react';

interface IListItemProps {
    listItemText: string;
}

export const ListItem : FC<IListItemProps> = ({listItemText}) => {

    return (
        <View style={{backgroundColor: '#0f0'}}>
            <Text>{listItemText}</Text>
        </View>
    );
}
