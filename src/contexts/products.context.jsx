import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductsContext = createContext({
    products: [],
});

/**
 * We render the children between the context provider.
 * Provider value is what we want to store
*/
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    //fire off only once, to input items into firestore - Hats,Shoes,sneakers -removed the useEffect as we wanted to do it once only -- typically not done on front-end
    
    const value = { products }// pass products as an object.
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}