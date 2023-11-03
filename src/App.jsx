import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"

// layouts
import MainWrapper from "@/layouts/MainWrapper"
import PrivateRoute from "@/layouts/PrivateWrapper"

// pages
import Home from "@/pages/Home"
import Signin from "@/pages/Signin"
import Signup from "@/pages/Signup"
import Profile from "@/pages/profile/Profile"
import Logout from "@/pages/Logout"
import Products from "@/pages/Product"
import Detail from "@/pages/ProductDetail"
import Google from "@/pages/GoogleCallBack"
import VerifyEmail from "@/pages/VerifyEmail"
import Cart from "@/pages/Cart"
import CheckOut from "@/pages/Checkout"
import Brand from "@/pages/Brand"
import ResetPassword from "@/pages/ResetPassword"
import ResetPasswordConfirm from "@/pages/ResetPasswordConfirm"
import ChangePassword from "@/pages/ChangePassword"
import BrandDetail from "@/pages/BrandDetail"
import NewArrival from "@/pages/NewArrival"
import Category from "@/pages/Category"
import OrderHistoryDetail from "@/pages/OrderHistoryDetail"

// payment
import Finish from "@/pages/payment/Finish"
import Unfinish from "@/pages/payment/Unfinish"
import Error from "@/pages/payment/Error"

const App = () => {
  const appendRecaptcha = () => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?render=" + siteKey
    script.async = true
    script.defer = true

    if (document.body.contains(script)) {
      return
    } else {
      document.body.appendChild(script)
    }
  }

  const appendMidtrans = () => {
    const script = document.createElement("script")
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js"
    script.async = true
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    )

    if (document.body.contains(script)) {
      return
    } else {
      document.body.appendChild(script)
    }
  }

  useEffect(() => {
    appendRecaptcha()
    appendMidtrans()
  }, [])

  return (
    <BrowserRouter>
      <MainWrapper>
        <Routes>
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Detail />} />
          <Route path="/google" element={<Google />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/order-history" element={<OrderHistoryDetail />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <CheckOut />
              </PrivateRoute>
            }
          />
          <Route path="/brand" element={<Brand />} />
          <Route path="/brand/:startWith?" element={<Brand />} />
          <Route path="/brand-detail/:slug?" element={<BrandDetail />} />
          <Route path="/new-arrival" element={<NewArrival />} />
          <Route path="/category/:slug?" element={<Category />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password/:uid/:token"
            element={<ResetPasswordConfirm />}
          />
          <Route
            path="/payment/finish"
            element={
              <PrivateRoute>
                <Finish />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/unfinish"
            element={
              <PrivateRoute>
                <Unfinish />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/error"
            element={
              <PrivateRoute>
                <Error />
              </PrivateRoute>
            }
          />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  )
}

export default App
