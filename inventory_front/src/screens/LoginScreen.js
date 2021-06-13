import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {login} from "../actions/userActions";
import FormContainer from "../components/FormContainer";

function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const redirect=location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo } = userLogin


    useEffect(()=>{
        // first checking if user is already logged in then no need to show login page
        if(userInfo){
            history.push(redirect)
        }
        }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer>
           <h1>Sign In</h1>
            {error && <Message varient='danger'>{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(event => setEmail(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(event => setPassword(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Sign In</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer? <Link
                    to={redirect ? `/register?redirect=${redirect}`:'/register'}>
                    Register
                </Link>
                </Col>
            </Row>
        </FormContainer>
    );
}

export default LoginScreen;