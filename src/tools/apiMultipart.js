import axios from "axios"
import { API_BASE_URL } from "./constants"

const apiMultipart = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
})

apiMultipart.defaults.withCredentials = true

export default apiMultipart
