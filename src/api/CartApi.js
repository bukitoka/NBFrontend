/**
 * Api list for cart
 */
import api from "../tools/api";
import { API_MIDDLE_URL } from "../tools/constants";
import Cookies from 'js-cookie';

/**
 * Fetch all cart items
 */
export const fetchCartItems = async (useruuid) => {
  try {
    const response = await api.get(`${API_MIDDLE_URL}cart/${useruuid}/`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
}


export const insertCartItem = async (cart, product, stock, quantity) => {
  try {
     const response  = await api.post(`${API_MIDDLE_URL}cart-item/`, {
       cart,
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

export const setCartIdCookie = (cartId) => {
  Cookies.set('cart_id',cartId );
}

export const getCartIdCookie = () => {
  return Cookies.get('cart_id') ?? null;
}

