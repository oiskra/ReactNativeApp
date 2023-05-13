import { FC } from "react";
import { View,Text, Button, Image, StyleSheet } from "react-native";
import { colors } from "../constants";
import { CustomButton } from "../components/CustomButton";


export const Main : FC = () => {

    return (
        <View style={mainStyles.mainContainer}>
            <View style={{
                justifyContent: 'center', 
                alignItems: 'center',
                marginVertical: 10
            }}>
                <Image style={mainStyles.img}  source={require("../assets/umbrella.png")}></Image>
                <Text style={mainStyles.header}>Weather App</Text>
            </View>
            <CustomButton title="Search"/>
            <CustomButton title="Favourites"/>
            <CustomButton title="About"/>
            <CustomButton title="Settings"/>
        </View>
    );
}

const mainStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 15,
        paddingHorizontal:20,
        backgroundColor: colors.columbiaBlue
    },
    header: {
        textAlign: 'center', 
        fontSize: 30,
        fontWeight: 'bold'
    },
    img: {
        width:100,
        height:100
    }

    

});