import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {register} from "../actions/userActions";
import FormContainer from "../components/FormContainer";


function RegisterScreen({location, history}) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect=location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo } = userRegister


    useEffect(()=>{
        // first checking if user is already logged in then no need to show login page
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault()
        if(password!==confirmPassword){
            setMessage('Password do not match')
        }else {
            dispatch(register(name, email, password))
        }
    }
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {message && <Message varient='danger'>{message}</Message>}
            {error && <Message varient='danger'>{error}</Message>}
            {loading && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(event => setName(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(event => setEmail(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(event => setPassword(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(event => setConfirmPassword(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account? <Link
                    to={redirect ? `/login?redirect=${redirect}`:'/login'}>
                    Sign In
                </Link>
                </Col>
            </Row>

        </FormContainer>
    );
}

export default RegisterScreen;