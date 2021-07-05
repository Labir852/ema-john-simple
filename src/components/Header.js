import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import logo from '../../src/images/logo.png';
import { UserContext } from '../App';
import './Header.css';
const Header = () => {
    const [loggedInUser,setLoggedInUser] =  useContext(UserContext);

    return (
        <div className="header">
            <img src={logo} alt = ""/>
        <nav>
            <Link to="/shop">Shop</Link>
            <Link to="/review">Order Review</Link>
            <Link to="/inventory">Manage Inventory</Link>
            {loggedInUser.isSignedIn ?<Link to="/"> <button onClick={()=>setLoggedInUser({})}>Sign out</button> </Link> : <Link to="/login"><button>Sign In</button></Link> }

            
        </nav>
        </div>
    );
};

export default Header;