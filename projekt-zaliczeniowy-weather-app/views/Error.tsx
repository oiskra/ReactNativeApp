import React, { FC } from "react";
import { View, Text } from "react-native";
import { colors } from "../constants";
import { CustomButton } from "../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type ErrorProps = NativeStackScreenProps<RootStackParamList, "Error">;

export const Error: FC<ErrorProps> = ({ navigation, route }) => {
  const error: string = route.params.errorMsg;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.background,
        padding: 15,
      }}
    >
      <View
        style={{
          backgroundColor: colors.background,
          padding: 20,
          borderRadius: 10,
          borderWidth: 3,
          borderColor: "#f44",
        }}
      >
        <Text
          style={{
            fontFamily: "DMSansBold",
            fontSize: 20,
            color: "#f44",
          }}
        >
          Ups...
        </Text>
        <Text
          testID="error-msg"
          style={{
            fontFamily: "DMSansBold",
            color: "#f44",
          }}
        >
          {error}
        </Text>
        <CustomButton
          title="OK"
          buttonStyle={{
            backgroundColor: "#f44",
            padding: 10,
            marginTop: 15,
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => navigation.popToTop()}
        />
      </View>
    </View>
  );
};
