import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Form, Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails, register, updateUserProfile} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";


function ProfileScreen({history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile




    useEffect(()=>{
        // first checking if user is already logged in then no need to show login page
        if(!userInfo){
            history.push('/login')
        }else {
            // checking if user detail or data is already loaded or not in page, if  not then get this.
            if (!userInfo || !user.name || success){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            }else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (event) => {
        event.preventDefault()
        if(password!==confirmPassword){
            setMessage('Password do not match')
        }else {
         /*   Now we are triggering the updateUserProfile() with modified data in object form
            to update*/

            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))

            setMessage('')
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h1>Profile</h1>
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
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(event => setPassword(event.target.value))}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(event => setConfirmPassword(event.target.value))}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>Update</Button>

                </Form>

            </Col>

            <Col md={9}>
                <h1>Orders</h1>
            </Col>
        </Row>
    );
}

export default ProfileScreen;