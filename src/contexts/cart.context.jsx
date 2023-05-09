import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
});

/**
 * Check if item already exists in cartItems array.
 * If yes, increase/decrease the quantity.
 * if no, add item to cart.
 * Return new array with modified items
 */
const addCartItem = (cartItems,productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // if it exists we return a new array, not mutant the existing array
    if(existingCartItem){
        return cartItems.map(// cartItem is similar to A[i] --> the value in the array. ** map does not change the orginal array, it creates a new one
            (cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem );
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartProvider = ({children}) => {
    const [isCartOpen,setIsCartOpen] = useState(false);
    const [cartItems,setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems}
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}