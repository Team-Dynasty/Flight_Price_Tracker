// import React from 'react'
import React, {useRef} from 'react'
import styled from 'styled-components'
import { Form,Button,Card} from 'react-bootstrap'

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    return (
        <Container>
            <Card>
                <Card.Body>
                    <h2 className ="text-center ">Login</h2>
                <Form>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Container>
                    <Button className="w-40" type="submit">Login</Button>
                    </Container>
                </Form>
                </Card.Body>
            </Card>
            <div className ="w-100 text-center mt-2">
                dont't have an account? Signup 
            </div>
        </Container>
    )
}

export default Login
const Container = styled.div `
    background-color:white;
`