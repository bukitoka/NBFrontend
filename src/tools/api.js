import axios from "axios"
import { API_BASE_URL } from "@/tools/constants"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  timeoutErrorMessage: "Request timed out",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

api.defaults.withCredentials = true

export default api
