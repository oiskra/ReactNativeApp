import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Main } from './views/Main';
import { About } from './views/About';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './constants';
import { WeatherInfo } from './views/WeatherInfo';
import { Search } from './views/Search';
import { useFonts } from 'expo-font';
import { Favourites } from './views/Favourites';
import { createTables, getDBConnection } from './db-service';
import * as SQLite from 'expo-sqlite'

export type RootStackParamList = {
  Main: undefined;
  About: undefined;
  Settings: undefined;
  Search: undefined;
  Favourites: undefined;
  WeatherInfo: {city: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const db: SQLite.WebSQLDatabase = getDBConnection();
createTables(db);

export default function App() {

  const [fontsLoaded] = useFonts({
    'DMSansBold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSansMedium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans': require('./assets/fonts/DMSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitleStyle: {fontFamily: 'DMSansBold'},
          }}
        >
          <Stack.Screen
            name="Main"
            component={Main}
          />
          <Stack.Screen
            name='Search'
            component={Search}
          />
          <Stack.Screen
            name='About'
            component={About}
          />
          <Stack.Screen
            name='Favourites'
            component={Favourites}
          />
          {/* <Stack.Screen
            name='Settings'
            component={WeatherInfo}
          /> */}
          <Stack.Screen
            name='WeatherInfo'
            component={WeatherInfo}
            />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.oxfordBlue,
  }
});