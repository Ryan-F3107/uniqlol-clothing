import {CartDropdownContainer, EmptyMessage, CartItems} from './card-dropdown.styles';
import Button from '../button/button.component';
import CartItem from '../cardItem/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';

const CardDropdown = () =>{
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return(
        <CartDropdownContainer>
            <CartItems>
                {   //conditional - if cart is empty or not
                    cartItems.length ? (cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}/>
                    ))) : (
                        <EmptyMessage>Your cart is empty!</EmptyMessage>
                    )
                }
            </CartItems>
                <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CardDropdown;