/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import type {Node} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import RootStackScreen from './src/navigation/RootStackScreen';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'


import configureStore from './src/store/index';


import Splash from './src/screens/Splash'
import SplashScreen from 'react-native-splash-screen';

const { store, persistor } = configureStore()

const App: () => Node = () => {
  
  useEffect(() => {
    SplashScreen.hide();
  }, [])


  return (
    <SafeAreaProvider>
      <Provider store = { store }>
        {/* <PersistGate loading={<Splash/>} persistor={persistor}> */}
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <RootStackScreen />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
