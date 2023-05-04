import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CardIcon from '../../components/card-icon/card-icon.component';
import CardDropdown from '../../components/card-dropdown/card-dropdown.component';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);  //  we want the value of the current User

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrownLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/Shop'>
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutUser}>Sign Out</span>
                        ) :
                            (
                                <Link className='nav-link' to='/auth'>
                                    Sign In
                                </Link>
                            )
                    }
                    <CardIcon/>
                </div>
            <CardDropdown/>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;