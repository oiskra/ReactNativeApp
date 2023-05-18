import { FC } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { colors } from "../constants";
import { CustomButton } from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";


type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>

export const Main : FC<MainProps> = ({ navigation }) => {

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={mainStyles.mainContainer}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10
                }}>
                    <Image style={mainStyles.img}  source={require("../assets/umbrella.png")}></Image>
                    <Text style={mainStyles.mainHeader}>WeatherNow</Text>
                </View>
                <CustomButton title="Check Weather" onPress={() => navigation.push('Search')}/>
                <CustomButton title="Favourites" onPress={() => navigation.push('Favourites')}/>
                <CustomButton title="About" onPress={() => navigation.push('About')}/>
                <CustomButton title="Settings"  onPress={() => navigation.push('Settings')}/>
            </View>
        </SafeAreaView>
    );
}

const mainStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 15,
        paddingHorizontal:20,
        backgroundColor: colors.columbiaBlue,
    },
    mainHeader: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'DMSansBold'
    },
    img: {
        width:100,
        height:100,
        margin: 10
    }

});