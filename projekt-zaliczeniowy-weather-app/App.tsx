import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Main } from './views/Main';
import { About } from './views/About';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './constants';
import { Search } from './views/Search';

export type RootStackParamList = {
  Main: undefined;
  About: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
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
            component={Settings}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.oxfordBlue,
  }
});
