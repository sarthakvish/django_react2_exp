import React, {useEffect, useState} from 'react';
import {LinkContainer} from "react-router-bootstrap"
import {Table, Button, Row, Col} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {listProducts, deleteProduct, createProduct} from "../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../constants/productConstants";
import Paginate from "../components/Paginate";
import MaterialTable, { MTablePagination } from 'material-table';
import axios from "axios";
import {Link} from '@material-ui/core'

function StockListScreen({history, match}) {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const [data, setData]=useState([])

    const columns = [
        {title: "ID", field: "_id"},
        {title: "Name", field: "name"},
        {title: "Price", field: "price"},
        {title: "Category", field: "category"},
        {title: "Brand", field: 'brand'},
        {title: "Count_Instock", field: 'countInStock', render:(row)=><div style={(row.countInStock < row.reorder_level)?{backgroundColor:'red', color: 'white',}:{background:"white"}}>
                {(row.countInStock < row.reorder_level)?row.countInStock:row.countInStock}
            </div>},
        {title: "Reorder_Level", field: 'reorder_level'},
        {title:"",render:rowData=><div>
                <LinkContainer to={`/admin/product/${rowData._id}/edit`}>
                    <Button variant='info' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                    </Button>
                </LinkContainer>

                <Button className='btn-sm' variant='danger' onClick={() => { deleteHandler(rowData._id)}}><i className='fas fa-trash'></i></Button></div>},

    ]

    let keyword = history.location.search

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }


    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})
        if (!userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts(keyword))
        }

    },[dispatch, history, userInfo, successDelete, successCreate, keyword])
    return (
        <div>
            <Button className='my-3' onClick={createProductHandler}>
                <i className='fas fa-plus'></i> Create Product
            </Button>

            {loadingDelete && <Loader/>}
            {errorDelete && <Message varient='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message varient='danger'>{errorCreate}</Message>}

            {loading ? (<Loader/>): error
                ?(<Message varient='danger'>{error}</Message> )
                :(<MaterialTable columns={columns}
                                 data={products}
                                 title='Stock Table'
                                 options={{
                                     filtering: true,
                                     exportButton: true,
                                     columnsButton: true,

                                 }}
                                 components={{
                                     Pagination: props => (
                                         <div style={{backgroundColor: '#e8eaf5'}}>
                                             <Paginate page={page} pages={pages} isAdmin={true}/>
                                         </div>
                                     )
                                 }}


                />)}



        </div>
    );

}
export default StockListScreen;