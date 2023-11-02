import useAuthStore from "../store/authStore"
import jwt_decode from "jwt-decode"
import Cookies from "js-cookie"
import dayjs from "dayjs"
import api from "./api"

export const login = async (email, password, rememberMe) => {
  try {
    const { data, status } = await api.post("auth/login/", {
      email,
      password,
    })
    if (status === 200) {
      setAuthUser(data.access, data.refresh, rememberMe)
    }
    return { data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    }
  }
}

export const register = async (
  first_name,
  last_name,
  email,
  password1,
  password2
) => {
  try {
    const { data } = await api.post("auth/registration/", {
      first_name,
      last_name,
      email,
      password1,
      password2,
    })

    return { data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error.response.data || "Something went wrong",
    }
  }
}

export const logout = async () => {
  const refreshToken = Cookies.get("refresh_token")

  try {
    const { data, status } = await api.post("auth/logout/", {
      refresh: refreshToken,
    })

    if (status === 200) {
      Cookies.remove("access_token")
      Cookies.remove("refresh_token")
      useAuthStore.getState().setUser(null)
      useAuthStore.getState().setIsLoggedIn(false)
    }

    return { data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.detail || "Something went wrong",
    }
  }
}

export const setUser = async () => {
  // ON PAGE LOAD
  const accessToken = Cookies.get("access_token")
  const refreshToken = Cookies.get("refresh_token")

  if (!refreshToken || isRefreshTokenExpired(refreshToken)) {
    return // If no refresh token or refresh token is expired, ask user to login
  } else if (!accessToken || isAccessTokenExpired(accessToken)) {
    try {
      const response = await refreshAccessToken(refreshToken)
      setAuthUser(response.access, refreshToken)
    } catch (error) {
      console.error("Error refreshing access token:", error)
    }
  } else {
    setAuthUser(accessToken, refreshToken)
  }
}

export const setAuthUser = (access_token, refresh_token, rememberMe) => {
  const accessExpirationMinutes = rememberMe ? 1 * 24 * 60 : 15 // 1 days if rememberMe, otherwise 15 minutes
  const accessExpirationDate = dayjs().add(accessExpirationMinutes, "minutes")

  Cookies.set("access_token", access_token, {
    expires: accessExpirationDate.toDate(),
    secure: true,
  })

  const existingRefreshToken = Cookies.get("refresh_token")
  if (!existingRefreshToken) {
    const refreshExpirationDays = rememberMe ? 3 : 1 // 3 days if rememberMe, otherwise 1 days
    const refreshExpirationDate = dayjs().add(refreshExpirationDays, "days")

    Cookies.set("refresh_token", refresh_token, {
      expires: refreshExpirationDate.toDate(),
      secure: true,
    })
  }

  const user = jwt_decode(access_token) ?? null

  if (user) {
    // store only the user_id in the authStore
    useAuthStore.getState().setUser(user.user_id)
    useAuthStore.getState().setIsLoggedIn(true)
  }

  useAuthStore.getState().setLoading(false)
}

export const refreshAccessToken = async () => {
  const refresh_token = Cookies.get("refresh_token")
  const response = await api.post("auth/token/refresh/", {
    refresh: refresh_token,
  })

  return response.data
}

export const isAccessTokenExpired = (accessToken) => {
  try {
    const decodedToken = jwt_decode(accessToken)
    const expirationTime = dayjs.unix(decodedToken.exp)
    return dayjs().isAfter(expirationTime) // Check if current time is after token's expiration time
  } catch (err) {
    return true // Token is invalid or expired
  }
}

export const isRefreshTokenExpired = (refreshToken) => {
  try {
    const decodedToken = jwt_decode(refreshToken)
    const expirationTime = dayjs.unix(decodedToken.exp)
    return dayjs().isAfter(expirationTime) // Check if current time is after token's expiration time
  } catch (err) {
    return true // Token is invalid or expired
  }
}

// store user info from google auth
export const googleAuthenticate = async (code) => {
  try {
    const res = await api.post("auth/google/", {
      code,
    })

    if (res.status === 200) {
      setAuthUser(res.data.access, res.data.refresh, true)
      useAuthStore.getState().setIsLoggedIn(true)
    }

    return { data: res.data, error: null }
  } catch (err) {
    console.log(err)

    return {
      data: null,
      error: err.response.data?.detail || "Something went wrong",
    }
  }
}

// email verification
export const verifyEmail = async (key) => {
  try {
    const res = await api.post("auth/registration/verify-email/", {
      key,
    })

    return { data: res.data, error: null }
  } catch (err) {
    console.log(err)

    return {
      data: null,
      error: err.response.data?.detail || "Something went wrong",
    }
  }
}

// password reset
export const resetPassword = async (email) => {
  try {
    const res = await api.post("auth/password/reset/", {
      email,
    })

    return { data: res.data, error: null }
  } catch (err) {
    console.log(err)

    return {
      data: null,
      error: err.response.data?.detail || "Something went wrong",
    }
  }
}

// password reset confirm
export const resetPasswordConfirm = async (
  uid,
  token,
  new_password1,
  new_password2
) => {
  try {
    const res = await api.post("auth/password/reset/confirm/", {
      uid,
      token,
      new_password1,
      new_password2,
    })

    return { data: res.data, error: null }
  } catch (err) {
    console.log(err)

    return {
      data: null,
      error: err.response.data?.detail || "Something went wrong",
    }
  }
}

export const changePassword = async (
  old_password,
  new_password1,
  new_password2
) => {
  try {
    const res = await api.post("auth/password/change/", {
      old_password,
      new_password1,
      new_password2,
    })

    return { data: res.data, error: null }
  } catch (err) {
    console.log(err)

    return {
      data: null,
      error: err.response.data?.detail || "Something went wrong",
    }
  }
}
