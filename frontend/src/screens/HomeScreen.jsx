import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import Product from "../components/Product";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

import { useParams } from "react-router-dom";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();

  const { keyword, pageNumber } = useParams();

  const { loading, products, error, page, pages } = useSelector(
    (state) => state.productList
  );
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (

    <>
      <Meta />

      {!keyword ? <ProductCarousel /> : (<Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>)}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
          <Paginate pages={pages} page={page} isAdmin={false} keyword={keyword ? keyword : ''} />
        </Row>
      )}
    </>
  );
}

export default HomeScreen;
