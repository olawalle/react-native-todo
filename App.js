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
  Text,
} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './screens/Onboarding';
import HomeScreen from './screens/Home';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {persistStore, persistReducer} from 'redux-persist';

import combineReducers from './store/reducers/TodoReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const Stack = createStackNavigator();

const persistedReducer = persistReducer(persistConfig, combineReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

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
      <StatusBar barStyle={'light-content'} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
