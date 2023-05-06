import React from 'react';
import {Provider} from 'react-redux';
import store from '../AwesomeProject/src/app/store';
import { AppConatiner } from '../AwesomeProject/src/navigation/AppContainer';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

function App(): JSX.Element {

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.conatiner}>
        <AppConatiner />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    backgroundColor: 'red',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  conatiner : {
    height: '100%',
    width: '100%',
  }
});

export default App;
