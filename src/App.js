import Home from "./routes/home/home.component";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/check-out/checkout.component";
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch(); //only one dispatch that goes to the reducers
  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);//dispatch is added to remove the warning, not needed.

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;