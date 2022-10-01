import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    };

    return (
        <Form onSubmit={submitHandler} className="d-flex">
            <Form.Control type='text' name='q' onChange={(e) => { setKeyword(e.target.value) }} placeholder='search products...' ></Form.Control>
           &nbsp; <Button type='submit' variant='outline-success'>Search</Button>
        </Form>
    )
}

export default SearchBox