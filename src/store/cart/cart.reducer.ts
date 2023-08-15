import {AnyAction} from 'redux';
import { setCartItems, setIsCartOpen } from './cart.action';
import { CartItem } from "./cart.type";

export const CART_INTIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}
export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
};

export const cartReducer = (state = CART_INTIAL_STATE, action: AnyAction): CartState => {
    if(setIsCartOpen.match(action)){
        return {
            ...state,
            isCartOpen: action.payload,
        }
    }
    if(setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
    }
    return state;
}