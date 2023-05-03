import { createContext } from "react";
import PRODUCTS from '../shop-data.json';

export const ProductContext = createContext({});

/**
 * We render the children between the context provider.
 * Provider value is what we want to store
*/
export const ProductProvider = ({children}) => {
    return(
        <ProductContext.Provider>{children}</ProductContext.Provider>
    )
}