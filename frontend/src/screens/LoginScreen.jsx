import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = searchParams.get("redirect") ? searchParams.get("redirect") : null;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect ? `/${redirect}` : "/");
    }
  }, [userInfo, history, redirect, navigate]);

  return (
    <FormContainer>
      <h1>SignIn</h1>

      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            disabled={loading}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="passsword">
          <Form.Label>Passsword</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Passsword"
            value={password}
            disabled={loading}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="my-3"
          disabled={loading}
        >
          Sign In
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
      </Form>
      <Row className="py-3">
        <Col>
          New customer ?&nbsp;&nbsp;
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
