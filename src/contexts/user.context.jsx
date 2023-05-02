//Pass a default value, not necessarily the initial value. Actual value you want to access
import { createContext, useState, useEffect } from 'react'
import { onAuthStateChangedHandler, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

//UserContext also needs a default value
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: () => null,
});
//UserProvider lets the children access any of the values from useState, as long as the children is wrapped within the userContext tags
export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null)// pass in null for the initial currentUser
    const value = { currentUser, setCurrentUser };// value is an object passed onto UserContext.Provider as a value attribute. Children can then access the useState values

    /** 
     * returns the cleanup function, removes the listener. When we sign out, the firebase auth is null and the listener is removed. 
     * The listener is removed and the user within firebase is signed out. So no memory leak, when we sign out. 
     * (I think) unscribe tells us What listerner to remove, to avoid adding on more listener to a stream
    */
    useEffect(() =>{
        const unsubscribe = onAuthStateChangedHandler((user)=>{
            if(user){
                createUserDocumentFromAuth(user); //we create a userDoc, if a user comes in
            }
            setCurrentUser(user);// if we sign out, user is null -- the auth keeps track of the user logins
        });
        return unsubscribe;
    }, []);//
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}