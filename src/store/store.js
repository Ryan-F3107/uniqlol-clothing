import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import thunk from "redux-thunk";

const persistConfig = {
    key:'root',
    storage,
    whitelist: ['cart']//reducers we don't want to persist.It won't persist the user logged in as that is done elsewhere
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
//helper, runs everytime, before dispatch hits a reducer.Before it hits the action it hits the middleware
const middleWares = [
    process.env.NODE_ENV !== 'production' && logger, thunk
].filter( Boolean);// if we are in the production node env, it will result in a false and the logger won't run.
const composedEnhancers = compose(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);