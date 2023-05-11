import './card-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cardItem/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CardDropdown = () =>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item}/>
                ))}
            </div>
                <Button onClick={goToCheckoutHandler} >GO TO CHECKOUT</Button>
        </div>
    );
};

export default CardDropdown;