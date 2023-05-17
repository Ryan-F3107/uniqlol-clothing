import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

/**
 * We render the children between the context provider.
 * Provider value is what we want to store
*/
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    //fire off only once, to input items into firestore - Hats,Shoes,sneakers -removed the useEffect as we wanted to do it once only -- typically not done on front-end
    //Next useEffect function: ---
    //Since below useEffect contains a function that uses async await, we need to create an async func -- getCategoriesMap to invoke getCategoriesAndDocuments() func..
    useEffect(() =>{
        const getCategoriesMap = async () =>  {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    },[])
    const value = { categoriesMap }// pass products as an object.
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}