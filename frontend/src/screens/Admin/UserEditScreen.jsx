import React, { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../../actions/userAction";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from "../../constants/userConstants";
import Col from 'react-bootstrap/Col';

const UserEditScreen = ({ history }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const [message, setMessage] = useState(null);
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector((state) => state.userUpdate);

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_DETAILS_RESET });
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/admin/userList');
        }

        if (!user.name || user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, id, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ id: id, name: name, email: email, isAdmin: isAdmin }));
    };

    return (
        <>
            <Link to='/admin/userList' className="btn btn-light my-3">Go Back</Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader />
                    : message ? <Message variant="danger">{message}</Message> :
                        (error) ? <Message variant="danger">{error}</Message> :
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Enter name"
                                        value={name}
                                        disabled={loading}
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        disabled={loading}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="password">
                                    <Form.Label>IsAdmin</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        checked={isAdmin}
                                        disabled={loading} onch
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                    ></Form.Check>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="my-3"
                                    disabled={loading}
                                >
                                    Update
                                    {loading && (
                                        <>
                                            &nbsp;&nbsp;
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                        </>
                                    )}
                                </Button>
                            </Form>}
            </FormContainer>
        </>
    );
};

export default UserEditScreen;
