import Home from "./routes/home/home.component";
import {Routes,Route} from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
  return(
    <div><h1>Shop Page</h1></div>
  )
};

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="Shop" element={<Shop/>}/>
        <Route path="auth" element={<Authentication />}/>
      </Route>
    </Routes>
  );
};

export default App;