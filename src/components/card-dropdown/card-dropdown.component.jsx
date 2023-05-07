import './card-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cardItem/cart-item.component';

const CardDropdown = () =>{
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {[].map(item => <CartItem cartItem={item}/>)}
            </div>
                <Button>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CardDropdown;