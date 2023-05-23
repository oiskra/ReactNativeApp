import { FC } from "react";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { colors } from "../constants";
import { ICities } from "../interfaces/ICities";
import { ListItem } from "../components/ListItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import {
  ISavedCity,
  createHistory,
  getDBConnection,
  getHistory,
} from "../db-service";
import * as SQLite from "expo-sqlite";
import { Dimensions } from "react-native";
import { useDebounce } from "../hooks/useDebounce";

type SearchProps = NativeStackScreenProps<RootStackParamList, "Search">;
const windowHeight = Dimensions.get("window").height;

export const Search: FC<SearchProps> = ({ navigation }) => {
  const [data, setData] = useState<ICities | undefined>(undefined);
  const [historyCities, sethistoryCities] = useState<ISavedCity[]>([]);

  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchTerm(debouncedSearchTerm);
      setActive(true);
    } else {
      setActive(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetch(`https://countriesnow.space/api/v0.1/countries/population/cities`)
      .then((res) => res.json())
      .then((result) => setData(result));

    const db: SQLite.WebSQLDatabase = getDBConnection();
    getHistory(db, sethistoryCities);
  }, []);

  const onSearchPress = (city: string) => {
    city = city.trim();
    if (debouncedSearchTerm !== "") {
      navigation.push("WeatherInfo", { city: city });

      if (!historyCities.find((e) => e.city === city)) {
        const db: SQLite.WebSQLDatabase = getDBConnection();
        createHistory(db, { city: city });
        sethistoryCities([{ city: city }, ...historyCities]);
      }
      setSearchTerm('')
    }
  };

  return (
    <KeyboardAvoidingView
      style={searchStyles.container}
      behavior="height"
      keyboardVerticalOffset={-300}
    >
      <View style={searchStyles.searchBar}>
        <TextInput
          style={searchStyles.textInput}
          value={searchTerm}
          placeholder="Enter city..."
          onChangeText={(text: string) => setSearchTerm(text)}
        />
      </View>
      {active && (
        <View style={!active ? searchStyles.none : searchStyles.flex}>
          <ScrollView
            style={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {data?.data.map((city) => {
              if (
                debouncedSearchTerm !== "" &&
                city.city
                  .toLocaleLowerCase()
                  .startsWith(debouncedSearchTerm.toLocaleLowerCase().trim())
              ) {
                return (
                  <ListItem
                    addictionalStyles={{}}
                    key={city.city}
                    listItemText={city.city}
                    onListItemPress={() => {
                        onSearchPress(city.city)
                        console.log(city.city);
                        
                    }}
                  />
                );
              }
              return;
            })}
          </ScrollView>
        </View>
      )}

      <View style={searchStyles.historyContainer}>
        <Text
          style={{
            margin: 10,
            fontSize: 18,
            fontFamily: "DMSansBold",
            borderBottomColor: colors.black,
            borderBottomWidth: 1,
            paddingBottom: 5,
            width: "100%",
          }}
        >
          Search history
        </Text>
        {historyCities.map((item) => (
          <ListItem
            addictionalStyles={searchStyles.listItemStyle}
            key={item.city}
            listItemText={item.city}
            onListItemPress={() =>
              navigation.push("WeatherInfo", { city: item.city })
            }
          />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
};

const searchStyles = StyleSheet.create({
  container: {
    paddingTop: windowHeight * 0.12,
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
  },
  searchIcon: {
    marginRight: 10,
    width: 15,
    height: 15,
  },
  listItemStyle: {
    backgroundColor: colors.jordyBlue,
    margin: 5,
    borderRadius: 10,
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  historyContainer: {
    zIndex: -1,
    flexGrow: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 5,
    color: colors.white,
    fontFamily: "DMSans",
    alignItems: "center",
  },
  none: {
    display: "none",
  },

  flex: {
    zIndex: 1000,
    top: windowHeight * 0.12 + 60,
    width: "95%",
    position: "absolute",
    display: "flex",
    marginHorizontal: 10,
    height: 200,
    borderWidth: 2,
    borderColor: colors.jordyBlue,
    borderRadius: 5,
    backgroundColor: colors.background,
    elevation: 20,
    shadowColor: colors.oxfordBlue,
  },
  textInput: {
    fontFamily: "DMSans",
    paddingLeft: 10,
    flexGrow: 1,
    height: 40,
  },
  searchBar: {
    margin: 10,
    display: "flex",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.jordyBlue,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
