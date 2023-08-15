import { signInFailed, signUpFailed, signOutSuccess, signInSuccess, signOutFailed } from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";
import {AnyAction} from 'redux';
export type UserState = {
    readonly currentUser: UserData | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
};
const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}
//Action is passed to every single reducer, so need to ensure that the default in switch statement returns the current state
export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
    if(signInSuccess.match(action)){
        return {
            ...state,
            currentUser: action.payload
        };
    }
    if(signOutSuccess.match(action)){
        return { ...state, currentUser: null};
    }
    if(signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)){
        return {
            ...state,
            error: action.payload
        };
    }
    return state; //default
};
