import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CardIcon from '../../components/card-icon/card-icon.component';
import CardDropdown from '../../components/card-dropdown/card-dropdown.component';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);  //  we want the value of the current User
    const {isCartOpen} = useContext(CartContext)

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrownLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/Shop'>
                        SHOP
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutUser}>Sign Out</NavLink>
                        ) :
                            (
                                <NavLink to='/auth'>
                                    Sign In
                                </NavLink>
                            )
                    }
                    <CardIcon/>
                    <div>
                        {isCartOpen && <CardDropdown/>}{/**Cart dropdown will dissapear when isCartOpen is false */}
                    </div>
                </NavLinks>
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;