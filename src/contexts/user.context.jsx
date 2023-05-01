//Pass a default value, not necessarily the initial value. Actual value you want to access
import { createContext, useState } from 'react'

//UserContext also needs a default value
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: () => null,
});
//UserProvider lets the children access any of the values from useState, as long as the children is wrapped within the userContext tags
export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null)// pass in null for the initial currentUser
    const value = { currentUser, setCurrentUser };// value is an object passed onto UserContext.Provider as a value attribute. Children can then access the useState values
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}