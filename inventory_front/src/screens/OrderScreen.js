import React, {useState, useEffect} from 'react';
import {Card, Button, Col, Row, ListGroup, Image, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getOrderDetails, payOrder} from "../actions/orderActions";
import {PayPalButton} from "react-paypal-button-v2";
import {ORDER_PAY_RESET} from "../constants/orderConstants";

function OrderScreen({match}) {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    const dispatch = useDispatch()

    // AXzK_CteTGrahCQvkZ_6kAFRy5PgWwdHoKDaTyK5DBgwBzz52aqzQDCr1xX66ENcx1g5aW8Tsd7U74D2

    const addPayPalScript = () =>{
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AXzK_CteTGrahCQvkZ_6kAFRy5PgWwdHoKDaTyK5DBgwBzz52aqzQDCr1xX66ENcx1g5aW8Tsd7U74D2'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    // order se orderitem ka overall price tab mangwana hai jab loading ho chuki hai or koi error na ho
    // means data a chuka ho successfully
    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(()=>{
        // jab order nahi dikh rha tabi to order detail mangwani hai
        // ya pahle se order detail hai  pr us order ki id hme jo chahiye wo ni hai to jao ar jo chahiye wo le k aao,
        if(!order || successPay || order._id !== Number(orderId)){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid){
            if (!window.paypal){
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    },[dispatch, order, orderId, successPay])


    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(orderId, paymentResult))
    }


    return loading ? (<Loader/>)
    :error ? (<Message varient='danger'>{error}</Message>):(
        <div>
            <h1>Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Shipping:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {''}
                                {order.shippingAddress.postalCode},
                                {''}
                                {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (<Message varient='success'>Delivered on {order.deliveredAt}</Message>)
                                : (<Message varient='warning'>Not Delivered</Message>)}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message varient='success'>Paid on {order.paidAt}</Message>)
                            : (<Message varient='warning'>Not Paid</Message>)}
                        </ListGroupItem>

                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {order.orderItems.length===0 ? <Message varient='info'>
                                Order is empty
                            </Message>:(
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) =>
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
                                    <Col>Rs{order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>Rs{order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Rs{order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            <ListGroupItem>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Rs{order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}

                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </div>
    );
}

export default OrderScreen;