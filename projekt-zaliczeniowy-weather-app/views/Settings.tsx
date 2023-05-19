import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { colors } from "../constants";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import  SettingsSingleton  from "../SettingsSingleton";
import { CustomButton } from "../components/CustomButton";
import { deleteAllFavourites, deleteAllHistory, getDBConnection } from "../db-service";

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>

export const Settings: FC<SettingsProps> = () => {

    const settings = SettingsSingleton.getInstance();
    const db = getDBConnection();

    const [isUnitsSwitchEnable, setUnitsSwitchEnable] = useState(settings.isImperial);
    const onUnitsChange = () => {
        setUnitsSwitchEnable(!isUnitsSwitchEnable);
        settings.changeUnits();
    }

    return (
        <View style={settingsStyles.mainComponent}>
            <View style={settingsStyles.settingItem}>
                <Text style={settingsStyles.textTitle}>Units</Text>
                <View style={settingsStyles.switch}>
                    <Text style={settingsStyles.swtichText}>Celcius</Text>
                    <Switch
                        onChange={onUnitsChange}
                        value={isUnitsSwitchEnable}
                    />
                    <Text style={settingsStyles.swtichText}>Fahrenheit</Text>
                </View>
            </View>
            <CustomButton 
                title="Clear History" 
                buttonStyle={settingsStyles.settingItem}
                textStyle={{color: colors.black,fontSize: 18}}
                onPress={() => deleteAllHistory(db)}
            /> 
            <CustomButton 
                title="Clear Favourites" 
                buttonStyle={settingsStyles.settingItem}
                textStyle={{color: colors.black,fontSize: 18}}
                onPress={() => deleteAllFavourites(db)}
            /> 
        </View>
    );
};

const settingsStyles = StyleSheet.create({
    mainComponent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    },
    settingItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        backgroundColor: colors.jordyBlue,
        margin: 10,
        borderRadius: 5,
        height: 80
    },
    textTitle: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'DMSansBold'
    },
    swtichText: {
        fontFamily: 'DMSans'
    },
    switch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    }
});