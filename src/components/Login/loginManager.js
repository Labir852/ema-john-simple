import * as firebase from "firebase/app";
import firebaseConfig from './firebase.config'
import "firebase/auth";

export const initializeLoginFramework = () =>{
    if(firebase.apps.length ===0)
    {
        firebase.initializeApp(firebaseConfig);
    }
    
}

export const handleGoogleSignin = ()=>{
    const Googleprovider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(Googleprovider)
    .then(res => {
      const {displayName,photoURL,email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email:email,
        photo:photoURL,
        Success:true
          }
      return (signedInUser);
      
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }


  export const handlefbSignIn = ()=> {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbprovider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      user.Success = true;
      return user;
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }


  export const handleSignOut = ()=>{
    return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name:"",
        photo: "",
        email:"",
        Success: false
      }
      return (signedOutUser);
    })
    .catch(err =>{
  
    })
  }

  export const createUserWithEmailAndPassword = (name,email,password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo =res.user;
      newUserInfo.error = "";
      newUserInfo.Success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error=>

     {
      // Handle Errors here.
      const newUserInfo={};
      newUserInfo.error = error.message;
      newUserInfo.Success = false;
      return newUserInfo;
      // ...
    });
  }

  export const signInWithEmailAndPassword = (email,password) =>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res => {
      const newUserInfo =res.user;
      newUserInfo.error = "";
      newUserInfo.Success = true;
      return newUserInfo;
    })
    .catch(function(error) {
      // Handle Errors here.
      const newUserInfo={};
      newUserInfo.error = error.message;
      newUserInfo.Success = false;
      return newUserInfo; 
      // ...
    });
  }

  const updateUserName = name =>{
    const user = firebase.auth().currentUser;
  
    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log("user name updated successfully");
    }).catch(function(error) {
      console.log(error);
    });
  }