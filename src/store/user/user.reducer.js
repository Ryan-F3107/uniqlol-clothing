export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
    currentUser: null,
}
//Action is passed to every single reducer, so need to ensure that the default in switch statement returns the current state
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;    //action contains only 2 values
    switch (type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                ...state,   //any values in the object are spread out and left untouched. The next values "currentUser" are changed.New object is returned with all the values
                currentUser: payload
            }
        default:
            return state;  //returns the same unchanged state, needed to be implemented as this is run everytime an action is invoked
    }
};
