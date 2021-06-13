import React, {useState} from 'react';
import { Form, Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import FormContainer from "../components/FormContainer";
import {saveShippingAddress} from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

/*    Once we have shipping add, we want to fill our address initial state by this shippingAddress,
        we dont want to fill again and again this*/

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler =(event)=>{
        event.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
/*        we send form data in the form of key value pair means object, but in state in add,city
        postalCode,country me already kv pair a gya hai, so directly passing*/

        history.push('/payment')
    }


    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(event => setAddress(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(event => setCity(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode ? postalCode : ''}
                        onChange={(event => setPostalCode(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Country'
                        value={country ? country : ''}
                        onChange={(event => setCountry(event.target.value))}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>

        </FormContainer>
    );
}

export default ShippingScreen;