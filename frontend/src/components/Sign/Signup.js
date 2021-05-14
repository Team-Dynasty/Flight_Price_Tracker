import React, {useRef} from 'react'
import styled from 'styled-components'
import { Form,Button,Card} from 'react-bootstrap'
import './loginstyle.css'

function Signup(props) {
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
        name,
        setName,
        contact,
        setContact
    }=props;


    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className ="text-center ">Sign Up</h2>
                    <Form>
                    <Form.Group >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                         type="text"
                         ref={nameRef} 
                         value={name}
                         required 
                         onChange={(e)=> setName(e.target.value)}
                         />
                        <Form.Label>Phone no.</Form.Label>
                        <Form.Control
                         type="number"
                         ref={phoneRef} 
                         value={contact}
                         required 
                         onChange={(e)=> setContact(e.target.value)}
                         />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                         type="email"
                         ref={emailRef} 
                         required 
                         value={email} 
                         onChange={(e)=> setEmail(e.target.value)}
                         />
                         <p className="errorMsg">{emailError}</p>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        ref={passwordRef} 
                        required 
                        value={password} 
                         onChange={(e)=> setPassword(e.target.value)}
                        />
                        <p className="errorMsg">{passwordError}</p>
                    </Form.Group>
                    {/* <Form.Group >
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group> */}
                    <Container>
                    <Button className="w-40" onClick={handleSignup}>Login</Button>
                    </Container>
                </Form>
                </Card.Body>
            </Card>
            <div className ="w-100 text-center mt-2">
                Already have an account? Log in 
            </div>
        </Container>
    )
}

export default Signup

const Container = styled.div `
    background-color:white;
    margin-bottom:20px;
`