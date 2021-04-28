import React,{useState} from 'react';
import {useEffect} from 'react'
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Login from './Login';
import Signup from './Signup';
import fire from '../../firebase'


export default function CenteredTabs() {
const [user,setUser]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [emailError,setEmailError]=useState("");
const [passwordError,setpasswordError]=useState("");
const [hasAccount,setHasAccount]=useState(false);

const clearInputs=()=>{
  setEmail("");
  setPassword("");
}
const clearErrors=()=>{
  setEmailError("");
  setpasswordError("");
}

const handleLogin = ()=>{
  clearErrors();
  fire
  .auth()
  .signInWithEmailAndPassword(email,password)
  .catch(error => {
    switch(error.code){
      case "auth/invalid-email":
      case "auth/user-disabled":
      case "auth/user-not-found":
        setEmailError(error.message);
        break;
      case "auth/wrong-passwprd":
        setpasswordError(error.message);
        break;
    }
});
};

const handleSignup=()=>{
  clearErrors();
  fire
  .auth()
  .createUserWithEmailAndPassword(email,password)
  .catch(error => {
    switch(error.code){
      case "auth/email-already-in-use":
      case "auth/invalid-email":
        setEmailError(error.message);
        break;
      case "auth/weak-passwprd":
        setpasswordError(error.message);    
        break;
    }
});
};

const handleLogout=()=>{
  fire.auth().signOut();
};

const authListener=()=>{
  fire.auth().onAuthStateChanged(user =>{
    if(user){
      clearInputs();
      setUser(user);
    }else{
      setUser("");
    }
  });
};

useEffect(() => {
  authListener();
}, []);





  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Profile>
      <TopTab
        value={value}
        onChange={handleChange}
        centered
      >
        <Tab label="Login" />
        <Tab label="Signup" />
      </TopTab>
      { value === 0 && 
      <Login 
      email={email} 
      setEmail={setEmail} 
      password={password} 
      setPassword={setPassword}
      handleLogin={handleLogin}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
       /> }
      { value === 1 &&
      <Signup
      email={email} 
      setEmail={setEmail} 
      password={password} 
      setPassword={setPassword}
      handleSignup={handleSignup}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      /> }

    </Profile>
);
}

const Profile = styled.div `
margin:auto;

`


const TopTab = styled(Tabs)`
    flex-grow:2;
    color:black;
    display:flex;
    width:auto;
    .MuiTab-root {
        text-transform:none;
    }
`
