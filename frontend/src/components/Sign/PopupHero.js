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
import App from '../../App'
// import db from '../../firebase'


export default function CenteredTabs() { 
const [user,setUser]=useState("");
const [email,setEmail]=useState("");
const [name,setName]=useState("");

const [contact,setContact]=useState("");
const [password,setPassword]=useState("");
const [emailError,setEmailError]=useState("");
const [passwordError,setpasswordError]=useState("");
const [hasAccount,setHasAccount]=useState(false);

const clearInputs=()=>{
  setEmail("");
  setPassword("");
  setName("");
  setContact("");
}
const clearErrors=()=>{
  setEmailError("");
  setpasswordError("");
}

async function handleLogin(){
  clearErrors();
  try{
  fire
  .auth()
  .signInWithEmailAndPassword(email,password)
  const currentUser = fire.auth().currentUser;
  console.log(currentUser.email);
  } catch(error){
    switch(error.code){
      case "auth/invalid-email":
      case "auth/user-disabled":
      case "auth/user-not-found":
        setEmailError(error.message);
        break;
      case "auth/wrong-password":
        setpasswordError(error.message);
        break;
    }
};
};

async function handleSignup(){
  
  try {
    
    await fire.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = fire.auth().currentUser;
    console.log(currentUser.uid);
    const db = fire.firestore();
    


    await db.collection("users")
      .doc(email)
      .set({
        contact:contact,
        email: email,
        name: name,
        querycount:0,
      });
      clearErrors();
  } catch (error) {
    switch(error.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setpasswordError(error.message);    
            break;
        }
  }
};

const handleLogout=()=>{
  fire.auth().signOut();
};

// function createDatabase() {
//   const data={
//       contact:contact,
//       email:email,
//       name:name,
//       querycount:0,
//   };
//   db.collection('users').doc(`${email}`).set(data);
// }

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
        <Tabi label="Login" />
        <Tabi label="Signup" />
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
      setName={setName}
      setContact={setContact}
      password={password} 
      setPassword={setPassword}
      handleSignup={handleSignup}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      name={name}
      setName={setName}
      contact={contact}
      setContact={setContact}
      /> }

    </Profile>
);
}

const Profile = styled.div `
margin:auto;

`

const Tabi = styled(Tab)`
  width:50px;
`

const TopTab = styled(Tabs)`
    width:100%;
    color:black;
    display:flex;
    .MuiTab-root {
        text-transform:none;
    }
`
