import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './root-saga';
export type RootState = ReturnType<typeof rootReducer>
declare global {
    interface Window{
        _REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}
type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
    key:'root',
    storage,
    whitelist: ['cart']//reducers we don't want to persist.It won't persist the user logged in as that is done elsewhere
}

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
//helper, runs everytime, before dispatch hits a reducer.Before it hits the action it hits the middleware
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware,
].filter( (middleware): middleware is Middleware => Boolean(middleware));// if we are in the production node env, it will result in a false and the logger won't run.

const composeEnhancer = 
(process.env.NODE_ENV !== 'production' && window && window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);
//once saga is instantiated, we tell it to run
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);