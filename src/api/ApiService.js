import api from "@/tools/api";
import apiMultipart  from "@/tools/apiMultipart";
import { API_MIDDLE_URL, API_BASE_URL } from "@/tools/constants";


/**
 * Api service for get
 */
export const apiGet = async (path, onSuccess, onError) => {
  try {
    const response = await api.get(`${API_MIDDLE_URL}${path}`);
    if (response.status === 200 || response.status === 201) {
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
 * Api service for post
 */
export const apiPost = async (path, data, onSuccess, onError) => {
  try {
    const response = await api.post(`${API_MIDDLE_URL}${path}`, data);
    if (response.status === 200 || response.status === 201) {
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
    if (response.status === 200 || response.status === 201) {
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
export const apiDelete = async (path, data, onSuccess, onError) => {
  try {
    const response = await api.delete(`${API_MIDDLE_URL}${path}`, data);
    if (response.status === 200 || response.status === 201) {
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
    if (response.status === 200 || response.status === 201) {
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
 * Api service for patch route
  * @param {*} path
  * @param {*} data
  * @param {*} onSuccess
  * @param {*} onError
  * @returns
 */
export const apiPatchRoute = async (path, data, onSuccess, onError) => {
  try {
      const response = await api.patch(`${API_BASE_URL}${path}`, data);
      if (response.status === 200 || response.status === 201) {
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
 * Api service for get route
 * @param {*} path
 * @param {*} onSuccess
 * @param {*} onError
 * @returns
 */
export const apiGetRoute = async (path, onSuccess, onError) => {
  try {
    const response = await api.get(`${API_BASE_URL}${path}`);
    if (response.status === 200 || response.status === 201) {
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
 * Api service for Patch multipart
 */
export const apiPatchMultipart = async (path, data, onSuccess, onError) => {
 try {
      const response = await apiMultipart.patch(`${API_BASE_URL}${path}`, data);
      if (response.status === 200 || response.status === 201) {
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
