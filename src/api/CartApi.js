import api from "@/tools/api"
import { API_MIDDLE_URL } from "@/tools/constants"
import { tokenChecking } from "@/tools/auth"

/**
 * Fetch all cart items
 */
export const fetchCartItems = async (onSuccess, onError) => {
  try {
    await tokenChecking()

    const response = await api.get(`${API_MIDDLE_URL}cart/`)
    if (response.status === 200) {
      onSuccess(response.data)
      return
    }
    onError(response.data)
    return
  } catch (error) {
    onError(error)
    throw error
  }
}

export const insertCartItem = async (product, stock, quantity) => {
  try {
    await tokenChecking()

    const response = await api.post(`${API_MIDDLE_URL}cart-item/`, {
      product,
      stock,
      quantity,
    })
    if (response.status === 201) {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

// update cart item quantity
export const increasetCartItem = async (
  cartid,
  quantity,
  onSuccess,
  onError
) => {
  try {
    await tokenChecking()

    const response = await api.patch(`${API_MIDDLE_URL}cart-item/${cartid}/`, {
      quantity,
    })
    if (response.status === 200) {
      onSuccess(response.data)
    }
  } catch (error) {
    onError(error)
  }
}

export const decreasetCartItem = async (
  cartid,
  quantity,
  onSuccess,
  onError
) => {
  try {
    await tokenChecking()

    const response = await api.patch(`${API_MIDDLE_URL}cart-item/${cartid}/`, {
      quantity,
    })
    if (response.status === 200) {
      onSuccess(response.data)
    }
  } catch (error) {
    onError(error)
  }
}
