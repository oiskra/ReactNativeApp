import { Main } from './views/Main';
import { About } from './views/About';
import { Error } from './views/Error';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { WeatherInfo } from './views/WeatherInfo';
import { Search } from './views/Search';
import { Settings } from './views/Settings';
import { useFonts } from 'expo-font';
import { Favourites } from './views/Favourites';
import { createTables, getDBConnection } from './db-service';
import { useCallback } from 'react';
import SplashScreen from 'react-native-splash-screen';

export type RootStackParamList = {
  Main: undefined;
  About: undefined;
  Settings: undefined;
  Search: undefined;
  Favourites: undefined;
  WeatherInfo: {city: string};
  Error: {errorMsg: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [fontsLoaded] = useFonts({
    'DMSansBold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSansMedium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans': require('./assets/fonts/DMSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  const db = getDBConnection();
  createTables(db);

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
            options={{headerShown: false}}
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
          <Stack.Screen
            name='Settings'
            component={Settings}
          />
          <Stack.Screen
            name='WeatherInfo'
            component={WeatherInfo}
          />
          <Stack.Screen 
            name='Error'
            component={Error}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
}