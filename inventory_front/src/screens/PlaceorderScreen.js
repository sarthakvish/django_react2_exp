import React, {useState, useEffect} from 'react';
import {Card, Button, Col, Row, ListGroup, Image, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";

function PlaceorderScreen() {
    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10 ).toFixed(2)
    cart.taxPrice = ((0.082)*cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)

    const placeOrder = () => {
        console.log("place order")
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping:</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                                {''}
                                {cart.shippingAddress.postalCode},
                                {''}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {cart.cartItems.length===0 ? <Message varient='info'>
                                Your cart is empty
                            </Message>:(
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) =>
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                {/*item.product me product ki id hai, hmne pahle product me id set krke rakhi hai,
                                                not product name*/}
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} * Rs{item.price} = Rs{(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    )}

                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>Rs{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>Rs{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Rs{cart.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Rs{cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <Button
                            type='button'
                            className='btn-block'
                            disabled={cart.cartItems===0}
                            onClick={placeOrder}>
                                Place Order
                            </Button>
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </div>
    );
}

export default PlaceorderScreen;