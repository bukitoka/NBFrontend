/**
 * Api list for cart
 */
import api from "../tools/api";
import { API_MIDDLE_URL } from "../tools/constants";

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

