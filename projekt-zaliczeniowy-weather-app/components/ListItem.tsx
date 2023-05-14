import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import React from 'react';
import { colors } from '../constants';

interface IListItemProps {
    listItemText: string;
}

export const ListItem : FC<IListItemProps> = ({listItemText}) => {

    return (
        <View style={styles.listItem}>
            <Text onPress={()=> console.log(listItemText)}>{listItemText}</Text>
        </View>
    );
}


const styles = StyleSheet.create({

    listItem: {
        zIndex: -1,
        backgroundColor: colors.black,
    }
});
