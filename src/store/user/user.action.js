import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPE } from "./user.types";

export const setCurrentUser = (user) => createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user); //returns back an Action object.

/**
 *     SET_CURRENT_USER: 'user/SET_CURRENT_USER',
    CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
    GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
    EMAIL_SIGN_IN_START: 'user/EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE',
 * */
export const checkUserSession = () => createAction(USER_ACTION_TYPE.CHECK_USER_SESSION);
export const googleSignInStart = () => createAction(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START);
export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPE.EMAIL_SIGN_IN_START, {email, password});
export const signInSuccess = (user) => createAction(USER_ACTION_TYPE.SIGN_IN_SUCCESS, user);
export const signInFailed = (error) => createAction(USER_ACTION_TYPE.SIGN_IN_FAILED, error);