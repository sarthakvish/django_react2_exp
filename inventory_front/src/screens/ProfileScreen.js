import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Form, Button, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails, register, updateUserProfile} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {listMyOrders} from "../actions/orderActions";


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

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders, error:errorOrders, orders} = orderListMy




    useEffect(()=>{
        // first checking if user is already logged in then no need to show login page
        if(!userInfo){
            history.push('/login')
        }else {
            // checking if user detail or data is already loaded or not in page, if  not then get this.
            if (!userInfo || !user.name || success || userInfo._id !== user.id){
                // 4th if condn for ki user edit screen k data user profile update k sath match na kr jaye isliye.
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
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
                {loadingOrders ? (
                    <Loader/>
                ) : errorOrders ? (
                    <Message varient='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Deliverd</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order =>(
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10): (
                                        <i className='fas fa-times' style={{color:'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
                }
            </Col>
        </Row>
    );
}

export default ProfileScreen;