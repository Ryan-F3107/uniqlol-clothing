import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import { signOutStart } from '../../store/user/user.action';
import CardIcon from '../../components/card-icon/card-icon.component';
import CardDropdown from '../../components/card-dropdown/card-dropdown.component';
import { useSelector, useDispatch } from 'react-redux';  //extract values from the redux store.
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    const signOutUser = () => dispatch(signOutStart());

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