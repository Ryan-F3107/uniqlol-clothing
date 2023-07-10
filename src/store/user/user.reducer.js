import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}
//Action is passed to every single reducer, so need to ensure that the default in switch statement returns the current state
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;    //action contains only 2 values
    switch (type) {
        case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
            return {
                ...state,   //any values in the object are spread out and left untouched. The next values "currentUser" are changed.New object is returned with all the values
                currentUser: payload
            };
        case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null};
        case USER_ACTION_TYPE.SIGN_IN_FAILED:
        case USER_ACTION_TYPE.SIGN_UP_FAILED:
        case USER_ACTION_TYPE.SIGN_OUT_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;  //returns the same unchanged state, needed to be implemented as this is run everytime an action is invoked
    }
};
