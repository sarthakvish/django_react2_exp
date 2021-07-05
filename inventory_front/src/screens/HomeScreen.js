import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";

import Product from "../components/Product";
// import axios from "axios"
import {Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";


function HomeScreen({history}) {
    // const [products, setProducts] = useState([])
    // useEffect(()=>{
    //     async function fetchProducts(){
    //         const {data} = await axios.get('http://127.0.0.1:8000/api/')
    //         console.log(data)
    //         setProducts(data)
    //     }
    //     fetchProducts()
    // }, [])

    // CODE FOR FETCHING DATA BY REDUX AND USE IT ON USE EFFECT,
    // WE ARE TRIGGER ACTION FUNCTION BY USER EFFECT IN REDUX.
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products, page, pages} = productList

    let keyword = history.location.search
    useEffect(()=>{
        dispatch(listProducts(keyword))
    },[dispatch, keyword])

    return (
        <div>
            {!keyword && <ProductCarousel/>}
            <h1>Latest Product</h1>
            {loading ? <Loader/>
                : error ? <Message varient='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword}/>
                    </div>

            }
            


        </div>
    );
}

export default HomeScreen;