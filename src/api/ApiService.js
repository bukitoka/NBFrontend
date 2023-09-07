import api from "../tools/api";
import { API_MIDDLE_URL } from "../tools/constants";


/**
 * Api service for get
 */
export const apiGet = async (path, onSuccess, onError) => {
  try {
    const response = await api.get(`${API_MIDDLE_URL}${path}`);
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


/**
 * Api service for post
 */
export const apiPost = async (path, data, onSuccess, onError) => {
  try {
    const response = await api.post(`${API_MIDDLE_URL}${path}`, data);
    if (response.status === 200) {
      onSuccess(response.data);
      return;
    }
    onError(response.data);
    return;
  } catch (error) {
    onError(error);
    throw error;
  }
}
