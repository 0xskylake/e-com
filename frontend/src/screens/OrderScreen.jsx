import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants";

function OrderScreen() {
    const { id } = useParams();

    const { order, loading, error } = useSelector((state) => state.orderDetails);
    const [sdkReady, setSdkReady] = useState(false)
    const [paypelClientId, setPaypelClientId] = useState(null);

    const { loading: loadingPay, success: successPay } = useSelector((state) => state.orderPay);
    const { loading: loadingDeliver, success: successDeliver } = useSelector((state) => state.orderDeliver);

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!loading) {
        const addDecimal = (num) => { return (Math.round(num * 100) / 100).toFixed(2); };
        order.itemsPrice = addDecimal(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult));
    };

    const deliverHandler = (paymentResult) => {
        dispatch(deliverOrder(id));
    };




    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');

            // const script = document.createElement('script');
            // script.type = 'text/javascript';
            // script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            // script.async = true;
            // script.onLoad = () => {
            //     setSdkReady(true);
            // }

            // document.body.appendChild(script);
            setPaypelClientId(clientId);
        }

        addPayPalScript();

        if (!order || order._id !== id || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })

            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            }
        }

        console.log(order)
    }, [order, id, order, successPay, successDeliver])

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name : </strong>{order.user.name}</p>
                            <p><strong>Email : </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>Address : </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                                {order.shippingAddress.postalCode}, {order.shippingAddress.contry}
                            </p>
                            {order.isDelivered ? <Message>Delivered on {order.deliveredAt}</Message> : (<Message variant="danger">Not Delivered</Message>)}

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message>Paid on {order.paidAt}</Message> : (<Message variant="danger">Not Paid</Message>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Item</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Order is empty</Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item) => (
                                        <ListGroup.Item key={item.product}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`} target="_blank">
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.price * item.qty}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} options={{ clientId: paypelClientId, }} />
                                    )}
                                </ListGroup.Item>
                            )}
                            {
                                userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        {loadingDeliver ? <Loader /> : (
                                            <Button type="button" className="btn btn-block" onClick={deliverHandler}>Mark as Deliverd</Button>
                                        )}
                                    </ListGroup.Item>)
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
export default OrderScreen