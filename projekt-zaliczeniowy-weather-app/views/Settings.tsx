import React, { FC, useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { colors } from "../constants";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SettingsSingleton } from "../SettingsSingleton";

type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>

export const Settings: FC<SettingsProps> = ({ navigation }) => {

    const settings = SettingsSingleton.getInstance();

    const [isThemeSwitchEnable, setThemeSwitchEnable] = useState(false);
    const onThemeChange = () => {
        setThemeSwitchEnable(!isThemeSwitchEnable);
        settings.changeTheme();
    }

    const [isUnitsSwitchEnable, setUnitsSwitchEnable] = useState(false);
    const onUnitsChange = () => {
        setUnitsSwitchEnable(!isUnitsSwitchEnable);
        settings.changeUnits();
    }

    return (
        <View style={settingsStyles.mainComponent}>
            <View style={settingsStyles.settingItem}>
                <Text style={settingsStyles.textTitle}>Theme</Text>
                <View style={settingsStyles.switch}>
                    <Text style={settingsStyles.swtichText}>Light</Text>
                    <Switch
                        onChange={onThemeChange}
                        value={isThemeSwitchEnable}
                    />
                    <Text style={settingsStyles.swtichText}>Dark</Text>
                </View>
            </View>
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
        </View>
    );
};

const settingsStyles = StyleSheet.create({
    mainComponent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.columbiaBlue
    },
    settingItem: {
        display: 'flex',
        width: '60%',
        backgroundColor: colors.jordyBlue,
        margin: 10,
        borderRadius: 10,
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