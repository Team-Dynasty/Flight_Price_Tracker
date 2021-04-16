import React, {useRef} from 'react'
import styled from 'styled-components'
import { Form,Button,Card} from 'react-bootstrap'

function Signup() {
    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className ="text-center ">Sign Up</h2>
                <Form>
                    <Form.Group id="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" ref={nameRef} required />
                    </Form.Group>
                    <Form.Group id="phonenumber">
                        <Form.Label>Phone no</Form.Label>
                        <Form.Control type="phonenumber" ref={phoneRef} required />
                    </Form.Group>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button className="w-100" type="submit">Signup</Button>
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
`