import React from 'react';
import './App.css';
import Header from './components/Header';
import Shop from './components/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/review/Review';
import Inventory from './components/Inventory/Inventory';
import Not_Found from './components/Not Found/Not_Found';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();


function App() {
  const [loggedInUser,setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
          <Shop></Shop>
          </Route>

          <Route path="/review">
            <Review></Review>
          </Route>

          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>

          <Route exact path="/">
          <Shop></Shop>
          </Route>

          <Route path="/product/:productkey">
            <ProductDetails></ProductDetails>
          </Route>

          <Route path="*">
          <Not_Found></Not_Found>
          </Route>

        </Switch>

      </Router>
        
    </UserContext.Provider>
  );
}

export default App;
