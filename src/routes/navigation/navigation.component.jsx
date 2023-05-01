import {Outlet, Link} from 'react-router-dom';
import { Fragment, useContext } from 'react';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () =>{
    const {currentUser, setCurrentUser} = useContext(UserContext);  //  we want the value of the current User
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null) // we reset the context -- user: null | we also are able to track the auth state of the user
    }
    return(
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrownLogo className='logo'/>
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/Shop'>
                    SHOP
                </Link>
                {
                    currentUser ? (
                        <span className='nav-link' onClick={signOutHandler}>Sign Out</span>
                    ):
                    (
                        <Link className='nav-link' to='/auth'>
                            Sign In
                        </Link>
                    )
                }
            </div>
        </div>
        <Outlet/>
      </Fragment>
    );
};

export default Navigation;