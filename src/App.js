import { Routes, Route } from 'react-router-dom';
import { useEffect, lazy,Suspense } from 'react';
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";
import Spinner from './components/spinner/spinner.component';

const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/check-out/checkout.component'));
const Home = lazy(() =>import('./routes/home/home.component'));

const App = () => {
  const dispatch = useDispatch(); //only one dispatch that goes to the reducers
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);//dispatch is added to remove the warning, not needed.

  return (
    <Suspense fallback={<Spinner/>}>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;