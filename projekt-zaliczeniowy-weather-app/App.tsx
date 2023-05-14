import React from 'react';
import { StyleSheet} from 'react-native';
import { colors } from './constants';
import { Search } from './views/Search';
import { Main } from './views/Main';
import { About } from './views/About';

export default function App() {

  return (
    // <Main />
    // <About />
    <Search />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.oxfordBlue,
    color: colors.columbiaBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
