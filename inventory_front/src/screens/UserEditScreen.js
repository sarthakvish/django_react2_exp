import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getUserDetails, updateUser} from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import {USER_UPDATE_RESET} from "../constants/userConstants";


function EditUserScreen({match, history}) {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = userUpdate


    useEffect(()=>{

        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, userId, history, successUpdate])

    const submitHandler = (event) => {
        console.log('submitted')

        event.preventDefault()
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))

    }
    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message varient='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> :error ? (<Message varient='danger'>{error}</Message>)
                :(
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(event => setName(event.target.value))}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(event => setEmail(event.target.value))}>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isadmin'>
                                <Form.Label>Password</Form.Label>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(event => setIsAdmin(event.target.checked))}>
                                </Form.Check>
                            </Form.Group>



                            <Button type='submit' variant='primary'>Update</Button>

                        </Form>
                    )}




            </FormContainer>

        </div>

    );
}

export default EditUserScreen;