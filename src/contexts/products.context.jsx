import { createContext, useState } from "react";
import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
    products: [],
});

/**
 * We render the children between the context provider.
 * Provider value is what we want to store
*/
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products}// pass products as an object.
    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}