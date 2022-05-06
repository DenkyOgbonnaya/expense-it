import React, { FC } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash/Splash';

const Stack = createNativeStackNavigator();

const Navigation:FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
