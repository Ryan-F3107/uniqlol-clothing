import { combineReducers } from "redux";// lets us create one big reducer
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    user: userReducer
});