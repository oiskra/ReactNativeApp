import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Main } from './views/Main';
import { About } from './views/About';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './constants';
import { WeatherInfo } from './views/WeatherInfo';
import { Search } from './views/Search';
import { useFonts } from 'expo-font';

export type RootStackParamList = {
  Main: undefined;
  About: undefined;
  Settings: undefined;
  Search: undefined;
  WeatherInfo: {city: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [fontsLoaded] = useFonts({
    'DMSansBold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSansMedium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans': require('./assets/fonts/DMSans-Regular.ttf'),
  });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

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