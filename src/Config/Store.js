import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage'
import { Reducer } from './Reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
}

const defaultState = {
    userData: []
}

export const LOGOUT = "LOGOUT";

function globalReducer(state = defaultState, action) {
    state = Reducer(state, action);

    switch (action.type) {
        case LOGOUT:
            return defaultState
        default:
            return state
    }
}

const persistedReducer = persistReducer(persistConfig, globalReducer)
let store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
let persistor = persistStore(store)


export const Store = store;
export const Persistor = persistor;