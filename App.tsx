/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {View, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';
import {QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './src/navigations/Navigation';
import {queryClient} from './src/configs/reactQuery';
import {Toast} from './src/components';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toast />
        <Navigation />
      </QueryClientProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
