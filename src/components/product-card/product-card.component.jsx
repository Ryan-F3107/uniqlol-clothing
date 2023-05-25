import './product-card.styles.scss';
import Button, {BUTTON_TYPE_CLASS} from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({product}) => {
    const {name, imageUrl, price} = product;
    const {addItemToCart} = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)
    return(    
    <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button buttonType={BUTTON_TYPE_CLASS.inverted} onClick={addProductToCart}>Add to Cart</Button>
    </div>
    );
};

export default ProductCard;