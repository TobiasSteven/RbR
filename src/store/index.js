import { createStore, combineReducers } from 'redux';

import rbrReducer from './reducers/customReducer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

const rootReducer = combineReducers(

{ rbr: rbrReducer }

);

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
  }