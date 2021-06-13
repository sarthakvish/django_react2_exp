import React, {useState} from 'react';
import {Form, Button, Col, FormGroup, FormLabel} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import FormContainer from "../components/FormContainer";
import {savePaymentMethod} from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
        history.push('/shipping')
    }

    const submitHandler =(event)=>{
        event.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(event => setPaymentMethod(event.target.value))}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>


        </FormContainer>
    );
}

export default PaymentScreen;