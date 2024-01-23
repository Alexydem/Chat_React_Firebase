import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { profileReducer } from './profile/reducer'
import { messagesReducer } from './messages/reducer'
import { APIReducer } from './articles/reducer'

const persistConfig = {
    key: 'root',
    storage,
    //сюда пишем исключения для локального стора
    blacklist: []
}

const rootReducer = combineReducers({
    profile: profileReducer,
    chats: messagesReducer,
    articles: APIReducer
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))

export const persistor = persistStore(store)