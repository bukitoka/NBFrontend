/**
 * Api list for product
 */
import api from "../tools/api";
import { API_MIDDLE_URL } from "../tools/constants";

/**
 * Fetch all products with pagination
 */
export const fetchProducts = async (page=null) => {
  try {
      const  path = page ? `${API_MIDDLE_URL}product/?page=${page}` : `${API_MIDDLE_URL}product/`;
        const response = await api.get(path);
        if (response.status === 200) {
            return response.data;
        }
        return null;
        } catch (error) {
            throw error;
    }
}

export const fetchProduct = async (slug) => {
    try {
        const response = await api.get(`${API_MIDDLE_URL}product/${slug}/`);
        if (response.status === 200) {
            return response.data;
        }
        return null;
        } catch (error) {
            throw error;
    }
}


