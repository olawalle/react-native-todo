/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Easing,
} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './screens/Onboarding';
import HomeScreen from './screens/Home';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import combineReducers from './store/reducers/TodoReducer';

const Stack = createStackNavigator();
const store = createStore(combineReducers);

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  const openConfig = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 50,
      overshootClamping: true,
    },
  };

  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 0,
      easing: Easing.linear,
    },
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
      // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Onboarding"
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.SlideFromRightIOS,
              transitionSpec: {
                open: openConfig,
                close: closeConfig,
              },
            }}
            headerMode="float"
            animation="fade">
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
