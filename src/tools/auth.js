import useAuthStore from "@/store/authStore"
import api from "@/tools/api"
import dayjs from "dayjs"

export const signin = async (email, password, token) => {
  try {
    const { data, status } = await api.post("auth/login/", {
      email: email,
      password: password,
      recaptcha: token,
    })
    if (status === 200) {
      setUser(data.user, data.access_expiration, data.refresh_expiration)
    }
    return { data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    }
  }
}

export const signup = async (
  first_name,
  last_name,
  email,
  password1,
  password2,
  token
) => {
  try {
    const { data } = await api.post("auth/registration/", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password1: password1,
      password2: password2,
      recaptcha: token,
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
  try {
    const { data, status } = await api.post("auth/logout/", {})

    if (status === 200) {
      setUser(null, null, null)
    }

    return { data, error: null }
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.detail || "Something went wrong",
    }
  }
}

export const setUser = async (user, access_expiration, refresh_expiration) => {
  useAuthStore.getState().setLoading(true)
  if (user && access_expiration && refresh_expiration) {
    const accessExp = dayjs(access_expiration).unix()
    const refreshExp = dayjs(refresh_expiration).unix()

    useAuthStore.getState().setUser(user)
    useAuthStore.getState().setIsLoggedIn(true)
    useAuthStore.getState().setAccessExpiration(accessExp)
    useAuthStore.getState().setRefreshExpiration(refreshExp)
  } else {
    useAuthStore.getState().setUser(null)
    useAuthStore.getState().setIsLoggedIn(false)
    useAuthStore.getState().setAccessExpiration(null)
    useAuthStore.getState().setRefreshExpiration(null)
  }
  useAuthStore.getState().setLoading(false)
}

// store user info from google auth
export const googleAuthenticate = async (code) => {
  try {
    const res = await api.post("auth/google/", {
      code,
    })

    if (res.status === 200) {
      setUser(
        res.data.user,
        res.data.access_expiration,
        res.data.refresh_expiration
      )
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
export const resetPassword = async (email, token) => {
  try {
    const res = await api.post("auth/password/reset/", {
      email: email,
      recaptcha: token,
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
  console.log(old_password, new_password1, new_password2)
  try {
    await tokenChecking()
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

export const refreshToken = async () => {
  try {
    const res = await api.post("auth/token/refresh/", {})

    return { data: res.data, error: res.status }
  } catch (err) {
    return {
      data: null,
      status: err.response.status,
    }
  }
}

export const tokenChecking = async () => {
  const isLoggedIn = useAuthStore.getState().isLoggedIn
  const accessExpiration = useAuthStore.getState().accessExpiration
  const refreshExpiration = useAuthStore.getState().refreshExpiration
  const now = dayjs().unix()

  if (isLoggedIn && now < refreshExpiration) {
    // if refresh token is not expired, check access token
    if (now > accessExpiration) {
      // token is expired, refresh it
      try {
        const { data } = await refreshToken()
        useAuthStore
          .getState()
          .setAccessExpiration(dayjs(data.access_expiration).unix())
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    // if refresh token is expired, redirect to login page
    await setUser(null, null, null)
  }

  return
}
