/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import uuid from 'react-native-uuid';
import SplashScreen from 'react-native-splash-screen';
import {LogBox} from 'react-native';
import {QueryClientProvider} from 'react-query';
import Navigation from './src/navigations/Navigation';
import {queryClient} from './src/configs/reactQuery';
import {Toast} from './src/components';
import {getCurrentUser, setCurrentUser, removeCurrentUser} from './src/utills/appStorage';
import {CREATE_USER_API} from './src/constants/endpoints/user';
import {handlePostRequest} from './src/services/shared';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          const userId = uuid.v4() as string
          const res = await handlePostRequest(CREATE_USER_API, {userId});
          await setCurrentUser(userId);
          console.log( 'RES', userId, res);
        } else {
          console.log(user, "USER")
        }
      } catch (error) {
        console.log(error, "ERROR");
      } finally {
        setLoading(false);
      }
    })();
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
