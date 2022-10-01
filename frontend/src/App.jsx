import React from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScren from "./screens/PlaceOrderScren";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/Admin/UserListScreen";
import UserEditScreen from "./screens/Admin/UserEditScreen";
import ProductListScreen from "./screens/Admin/ProductListScreen";
import ProductEditScreen from "./screens/Admin/ProductEditScreen";
import OrderListScreen from "./screens/Admin/OrderListScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="py-5 mt-4">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
            
            <Route exact path="/signIn" element={<LoginScreen />} />
            <Route exact path="/shipping" element={<ShippingScreen />} />
            <Route exact path="/payment" element={<PaymentScreen />} />
            <Route exact path="/placeorder" element={<PlaceOrderScren />} />
            <Route exact path="/order/:id" element={<OrderScreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
            <Route exact path="/register" element={<RegisterScreen />} />
            <Route exact path="/product/:id" element={<ProductScreen />} />
            <Route exact path="/cart/:id" element={<CartScreen />} />
            <Route exact path="/cart" element={<CartScreen />} />

            <Route exact path="/admin/userlist" element={<UserListScreen />} />
            <Route exact path="/admin/user/:id/edit" element={<UserEditScreen />} />

            <Route exact path="/admin/products" element={<ProductListScreen />} />
            <Route exact path="/admin/products/:pageNumber" element={<ProductListScreen />} />
            <Route exact path="/admin/product/:productId/edit" element={<ProductEditScreen />} />
            <Route exact path="/admin/orderlist" element={<OrderListScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
