import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Card, Button, Row, Col, Image, ListGroup, ListGroupItem, Form} from "react-bootstrap";
import Rating from "../components/Rating";
// import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";




function ProductScreen({match, history}) {
    // const [product, setProduct] = useState([])
    // useEffect(()=>{
    //     async function fetchProduct(){
    //         const {data} = await axios.get(`http://127.0.0.1:8000/api/product/${match.params.id}`)
    //         setProduct(data)
    //     }
    //     fetchProduct()
    // }, [])


    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    },[dispatch,match])

    const addToCartHandler = () =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    return (
        <div>
            <Link to="/" classname="btn btn-light my-3"> Go Back</Link>
            {loading ?
                <Loader/>
                :error ?
                <Message varient='danger'>{error}</Message>
                :(<Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroupItem>
                                    {product.name}
                                </ListGroupItem>

                                <ListGroupItem>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={"#f8e825"}/>
                                </ListGroupItem>

                                <ListGroupItem>
                                    Price: Rs{product.price}
                                </ListGroupItem>

                                <ListGroupItem>
                                    Discription: {product.description}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col><strong>Rs{product.price}</strong></Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>{product.countInStock>0 ? 'In stock' : 'Out of Stock'}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    {product.countInStock>0 && (
                                        <ListGroupItem>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs='auto' className='my-1'>
                                                    <Form.Control as='select' value={qty}
                                                                  onChange={e => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x)=>(
                                                                <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                </option>
                                                            ))
                                                        }

                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )}

                                    <ListGroupItem>
                                        <Button className="btn-block"
                                                disabled={product.countInStock === 0}
                                                type="button" onClick={addToCartHandler}>
                                            Add to Cart
                                        </Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>

                        </Col>
                    </Row>)}

        </div>
    );
}

export default ProductScreen;