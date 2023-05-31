[1mdiff --git a/src/routes/navigation/navigation.component.jsx b/src/routes/navigation/navigation.component.jsx[m
[1mindex daff156..1951832 100644[m
[1m--- a/src/routes/navigation/navigation.component.jsx[m
[1m+++ b/src/routes/navigation/navigation.component.jsx[m
[36m@@ -7,9 +7,10 @@[m [mimport { signOutUser } from '../../utils/firebase/firebase.utils';[m
 import CardIcon from '../../components/card-icon/card-icon.component';[m
 import CardDropdown from '../../components/card-dropdown/card-dropdown.component';[m
 import { CartContext } from '../../contexts/cart.context';[m
[32m+[m[32mimport { useSelector } from 'react-redux';  //extract values from the redux store.[m
 [m
 const Navigation = () => {[m
[31m-    const { currentUser } = useContext(UserContext);  //  we want the value of the current User[m
[32m+[m[32m    const currentUser = useSelector((state) => state.user.currentUser);[m
     const {isCartOpen} = useContext(CartContext)[m
 [m
     return ([m
