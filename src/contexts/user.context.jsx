//Pass a default value, not necessarily the initial value. Actual value you want to access
import { createContext, useEffect, useReducer } from 'react'
import { onAuthStateChangedHandler, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';
import { createAction } from '../utils/reducer/reducer.utils';

//UserContext also needs a default value
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}
const userReducer = (state, action) => {
    const { type, payload } = action;    //action contains only 2 values
    switch (type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                ...state,   //any values in the object are spread out and left untouched. The next values "currentUser" are changed.New object is returned with all the values
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

const INITIAL_STATE = {
    currentUser: null,
}
//UserProvider lets the children access any of the values from useState, as long as the children is wrapped within the userContext tags
export const UserProvider = ({ children }) => {
    //const [ currentUser, setCurrentUser ] = useState(null)// pass in null for the initial currentUser
    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE)  //from useReducer, get back new state and dispatcher - dispatcher uses the action.
    const { currentUser } = state;
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user));
    }
    const value = { currentUser, setCurrentUser };// value is an object passed onto UserContext.Provider as a value attribute. Children can then access the useState values

    /** 
     * returns the cleanup function, removes the listener. When we sign out, the firebase auth is null and the listener is removed. 
     * The listener is removed and the user within firebase is signed out. So no memory leak, when we sign out. 
     * (I think) unscribe tells us What listerner to remove, to avoid adding on more listener to a stream
    */
    useEffect(() => {
        const unsubscribe = onAuthStateChangedHandler((user) => {
            if (user) {
                createUserDocumentFromAuth(user); //we create a userDoc, if a user comes in
            }
            setCurrentUser(user);// if we sign out, user is null -- the auth keeps track of the user logins
        });
        return unsubscribe;
    }, []);//
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}