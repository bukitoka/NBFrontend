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


/**
 * Api service for put
 * @param {*} path
 * @param {*} data
 * @param {*} onSuccess
 * @param {*} onError
 * @returns
 */
export const apiPut = async (path, data, onSuccess, onError) => {
  try {
    const response = await api.put(`${API_MIDDLE_URL}${path}`, data);
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


/**
 * Api service for delete
 * @param {*} path
 * @param {*} onSuccess
 * @param {*} onError
 * @returns
 */
export const apiDelete = async (path,data, onSuccess, onError) => {
  try {
    const response = await api.delete(`${API_MIDDLE_URL}${path}`, data);
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



/**
 * Api service for patch
  * @param {*} path
  * @param {*} data
  * @param {*} onSuccess
  * @param {*} onError
  * @returns
  */
export const apiPatch = async (path, data, onSuccess, onError) => {
  try {
    const response = await api.patch(`${API_MIDDLE_URL}${path}`, data);
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
