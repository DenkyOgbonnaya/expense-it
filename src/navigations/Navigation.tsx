import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME_SCREEN} from './constants';
import Home from '../screens/home/Home';
import {backgroundColor, primaryBlueColor} from 'styles/colors';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={HOME_SCREEN}
        screenOptions={{
          headerStyle: {
            backgroundColor: primaryBlueColor,
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name={HOME_SCREEN}
          component={Home}
          options={{
            headerShown: false,
            title: '',

            headerStyle: {
              backgroundColor: primaryBlueColor,
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
