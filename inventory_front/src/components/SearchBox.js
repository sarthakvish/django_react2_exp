import React , {useState} from "react";
import {Button, Form} from "react-bootstrap";
import {useHistory} from 'react-router-dom'



function SearchBox(props) {

    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler=(e) =>{
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}`)
        }else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline style={{display:"flex"}}>
            <Form.Control
            type='text'
            name='q'
            onChange={(e)=>setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
            style={{marginRight:'1rem'}}>
            </Form.Control>
            <Button
            type='submit'
            variant='outline-success'
            className='p-1'>
                Submit
            </Button>

        </Form>
    );
}

export default SearchBox;