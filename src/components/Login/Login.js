import React, { useState } from 'react';

import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handlefbSignIn, handleGoogleSignin, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';




function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user,setUser]= useState({
    isSignedIn: false,
    name:"",
    email:"",
    photo:"",
    password:"",
    error:"",
    Success: false
  });

  initializeLoginFramework();
 const [ loggedInUser,setLoggedInUser ] = useContext(UserContext);
 const history = useHistory();
 const location = useLocation();
 let { from } = location.state || { from: { pathname: "/" } };




const handleResponse =(res,redirect)=>{
  setUser(res);
  setLoggedInUser(res);
  if(redirect)
  {
    history.replace(from);
  }
}


const handleSubmit = (e)=>{
  console.log(user.email, user.password);
    if(newUser && user.email && user.password ){
     createUserWithEmailAndPassword(user.name, user.email , user.password)
     .then(res=>{
      handleResponse(res,true);
    })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email , user.password)
      .then(res=>{
        handleResponse(res,true);
      })
    }
    e.preventDefault();
}
const handleBlur = (e) =>{
  let isFormValid =true;
    console.log(e.target.name , e.target.value);
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(isFormValid){
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }

}

const googleSignIn = () =>{
  handleGoogleSignin()
  .then(res=>{
    handleResponse(res,true);
    console.log(res);
  })
}
const SignOut = () =>{
  handleSignOut()
  .then(res=>{
    handleResponse(res,false);
  })
}
const fbSignIn = () => {
  handlefbSignIn()
  .then(res=>{
    handleResponse(res,true);
  })
}


  return (
    <div style={{textAlign: 'center'}}>
      { 
        user.isSignedIn ? <button onClick={SignOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign in Using Google</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn && 
        <div>
        <p>Welcome, {user.name}!</p>
        <p>Your Email: {user.email}</p>
        <img src={user.photo} alt=""/>
        </div>
      }

      <h1>Our own Authentication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label><br/>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="name"/>}
      <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Email Address" required/><br/>
      <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Password" required/><br/>
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign in'}/>
     </form>
     <p style={{color: 'red'}}>{user.error}</p>
     {user.Success && <p style={{color: 'green'}}>Woo Hoo! User {newUser ? "Created" : "Logged In"} Successfully</p>}

    </div>
  );
}

export default Login;
