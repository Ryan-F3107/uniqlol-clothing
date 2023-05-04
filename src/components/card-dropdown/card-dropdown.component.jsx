import './card-dropdown.styles.scss';
import Button from '../button/button.component';
const CardDropdown = () =>{
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'/>
                <Button>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CardDropdown;