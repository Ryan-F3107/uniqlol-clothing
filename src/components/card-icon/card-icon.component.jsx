import {ShoppingIcon, CartIconContainer, ItemCount} from './card-icon.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CardIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CardIcon;