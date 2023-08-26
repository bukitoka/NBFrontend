/**
 * Api list for cart
 */
import api from "../tools/api";
import { API_MIDDLE_URL } from "../tools/constants";
import Cookies from 'js-cookie';

/**
 * Fetch all cart items
 */
export const fetchCartItems = async (onSuccess, onError) => {
  try {
    const response = await api.get(`${API_MIDDLE_URL}cart/`);
    if (response.status === 200) {
      onSuccess(response.data);
      return;
    }
    onError(response.data);
    return ;
  } catch (error) {
    onError(error);
    throw error;
  }
}


export const insertCartItem = async ( product, stock, quantity) => {
  try {
     const response  = await api.post(`${API_MIDDLE_URL}cart-item/`, {
       product,
       stock,
       quantity
     });
    if (response.status === 201) {
      return response.data;
    }
  }catch (error) {
    throw error;
  }
 }


// update cart item quantity
export const increasetCartItem = async (cartid, quantity, onSuccess, onError) => {
  try {
    const response = await api.patch(`${API_MIDDLE_URL}cart-item/${cartid}/`, {
      quantity
    });
    if (response.status === 200) {
      onSuccess(response.data);
    }
  } catch (error) {
    onError(error);
  }

}

export const decreasetCartItem = async (cartid, quantity, onSuccess, onError) => {
  try {
    const response = await api.patch(`${API_MIDDLE_URL}cart-item/${cartid}/`, {
      quantity
    });
    if (response.status === 200) {
      onSuccess(response.data);
    }
  } catch (error) {
    onError(error);
  }
}
