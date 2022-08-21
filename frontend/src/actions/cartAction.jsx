import axios from "axios";
import {
  CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {

  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (date) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: date,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(date));
};

export const savePaymentMethod = (date) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: date,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(date));
};

export const clearCart = () => async (dispatch) => {
  dispatch({ type: CART_CLEAR_ITEMS });
  localStorage.setItem("cartItems", JSON.stringify([]));
};
