import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react"

// layouts
import MainWrapper from "@/layouts/MainWrapper"
import PrivateRoute from "@/layouts/PrivateWrapper"

// pages
import Home from "@/pages/Home"

// auth
import Signin from "@/pages/auth/Signin"
import Signup from "@/pages/auth/Signup"
import VerifyEmail from "@/pages/auth/VerifyEmail"
import Google from "@/pages/auth/GoogleCallBack"
import ResetPassword from "@/pages/auth/ResetPassword"
import ResetPasswordConfirm from "@/pages/auth/ResetPasswordConfirm"
import ChangePassword from "@/pages/auth/ChangePassword"

import Profile from "@/pages/Profile"
import Products from "@/pages/Product"
import Detail from "@/pages/ProductDetail"
import Cart from "@/pages/Cart"
import CheckOut from "@/pages/Checkout"
import Brand from "@/pages/Brand"
import BrandDetail from "@/pages/BrandDetail"
import NewArrival from "@/pages/NewArrival"
import Category from "@/pages/Category"
import OrderHistoryDetail from "@/pages/OrderHistoryDetail"
import FeedbackPage from "@/pages/FeedbackPage"
import Blog from "@/pages/Blog"
import BlogDetail from "@/pages/BlogDetail"
import PromoPage from "@/pages/PromoPage"
import PageNotFound from "@/pages/PageNotFound"
import ReviewPage from "@/pages/Review"

// payment
import Finish from "@/pages/payment/Finish"
import Unfinish from "@/pages/payment/Unfinish"
import Error from "@/pages/payment/Error"

// store
import useAuthStore from "@/store/authStore"

const App = () => {
  const appendRecaptcha = () => {
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    const script = document.createElement("script")
    script.src = "https://www.google.com/recaptcha/api.js?render=" + siteKey

    if (document.body.contains(script)) {
      return
    } else {
      document.body.appendChild(script)
    }
  }

  const appendIntercom = () => {
    const script = document.createElement("script")
    const appId = import.meta.env.VITE_INTERCOM_APP_ID
    script.textContent =
      "(function(){var w=window;var ic=w.Intercom;if(typeof ic==='function'){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/" +
      appId +
      "';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();"

    if (document.body.contains(script)) {
      return
    }
    document.body.appendChild(script)
  }

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const user = useAuthStore((state) => state.user)

  const handleIntercomUser = () => {
    if (isLoggedIn && user) {
      window.Intercom("update", {
        app_id: import.meta.env.VITE_INTERCOM_APP_ID,
        name: user?.first_name + " " + user?.last_name,
        email: user?.email,
        user_id: user?.id,
      })
    } else {
      window.Intercom("boot", {
        app_id: import.meta.env.VITE_INTERCOM_APP_ID,
      })
    }
  }

  useEffect(() => {
    appendRecaptcha()
    appendIntercom()
    handleIntercomUser()
  }, [user])

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
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Detail />} />
          <Route path="/google" element={<Google />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          <Route
            path="/order-history/:id"
            element={
              <PrivateRoute>
                <OrderHistoryDetail />
              </PrivateRoute>
            }
          />

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
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/promo" element={<PromoPage />} />
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

          <Route
            path="/review/:productSlug"
            element={
              <PrivateRoute>
                <ReviewPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/feedback"
            element={
              <PrivateRoute>
                <FeedbackPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  )
}

export default App
