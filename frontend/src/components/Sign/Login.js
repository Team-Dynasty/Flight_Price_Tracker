// import React from 'react'
import React,{useRef} from 'react'
import {useEffect} from 'react'
import styled from 'styled-components'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Form,Button,Card} from 'react-bootstrap'
import './loginstyle.css'
import '../../App'


const useStyles = makeStyles((theme) => ({
    card:{
        width:'500px'
    }
  }));
function Login(props){
    const{
    email, 
    setEmail, 
    password, 
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
}=props;


    // const emailRef = useRef();
    // const passwordRef = useRef();
    // const passwordConfirmRef = useRef();
    return (
        <Container>
            <Card >
                <Card.Body>
                    <h2 className ="text-center ">Login</h2>
                <Form>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                         type="email" 
                         required 
                         autoFocus
                         value={email} 
                         onChange={(e)=> setEmail(e.target.value)}
                         />
                         <p className="errorMsg">{emailError}</p>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password"
                        required 
                        value={password} 
                         onChange={(e)=> setPassword(e.target.value)}
                        />
                        <p className="errorMsg" >{passwordError}</p>
                    </Form.Group>
                    <Container>
                    <Button className="w-40" onClick={handleLogin}>Login</Button>
                    </Container>
                </Form>
                </Card.Body>
            </Card>
            <div className ="w-100 text-center mt-2">
                Don't have an account? Signup 
            </div>
        </Container>
    )
}
export default Login
const Container = styled.div `
    background-color:white;
    margin-bottom:20px;
`
