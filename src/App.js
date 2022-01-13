import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Inventory from './components/Inventory/Inventory.js';
import Login from './components/Login/Login';
import Not_Found from './components/Not Found/Not_Found.js';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ProductDetails from './components/ProductDetails/ProductDetails.js';
import Review from './components/review/Review.js';
import Shipment from './components/Shipment/Shipment';
import Shop from './components/Shop';

export const UserContext = createContext();


function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
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
