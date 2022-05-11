import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CATEGORIES_SCREEN, EXPENSES_SCREEN, HOME_SCREEN} from './constants';
import Home from '../screens/home/Home';
import {backgroundColor, primaryBlueColor, primaryDarkColor, primaryWhite} from 'styles/colors';
import Expenses from 'screens/expenses/Expenses';
import CategoryExpense from 'screens/categorizedExpens/CategorizedExpense';

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
        <Stack.Screen
          name={EXPENSES_SCREEN}
          component={Expenses}
          options={{
            headerShown: true,
            title: 'All Expenses',

            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: primaryDarkColor
          }}
        />
        <Stack.Screen
          name={CATEGORIES_SCREEN}
          component={CategoryExpense}
          options={{
            headerShown: true,
            title: 'Expenses By Category',

            headerStyle: {
              backgroundColor: backgroundColor,
            },
            headerTintColor: primaryDarkColor
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
