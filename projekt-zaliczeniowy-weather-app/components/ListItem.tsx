import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import React from 'react';
import { colors } from '../constants';

interface IListItemProps {
    listItemText: string;
    onListItemPress: () => void;
}

export const ListItem : FC<IListItemProps> = ({listItemText, onListItemPress}) => {

    return (
        <View style={styles.listItem}>
            <Text style={{fontFamily: 'DMSans'}} onPress={()=> onListItemPress()}>{listItemText}</Text>
        </View>
    );
}


const styles = StyleSheet.create({

    listItem: {
        zIndex: -1,
        color: colors.white,
        backgroundColor: colors.columbiaBlue,
        padding: 5,
    }

});
