import api from "@/tools/api"
import { API_MIDDLE_URL } from "@/tools/constants"
import { tokenChecking } from "@/tools/auth"

/**
 * Fetch all products with pagination
 */
export const fetchProducts = async (page = null) => {
  try {
    await tokenChecking()

    const path = page
      ? `${API_MIDDLE_URL}product/?page=${page}`
      : `${API_MIDDLE_URL}product/`
    const response = await api.get(path)
    if (response.status === 200) {
      return response.data
    }
    return null
  } catch (error) {
    console.log(error)
  }
}

export const fetchProduct = async (slug) => {
  try {
    await tokenChecking()

    const response = await api.get(`${API_MIDDLE_URL}product/${slug}/`)
    if (response.status === 200) {
      return response.data
    }
    return null
  } catch (error) {
    console.log(error)
  }
}
