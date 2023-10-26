import { BrowserRouter, Routes, Route } from "react-router-dom"

// layouts
import MainWrapper from "./layouts/MainWrapper"
import PrivateRoute from "./layouts/PrivateWrapper"

// pages
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Profile from "./pages/profile/Profile"
import Logout from "./pages/Logout"
import Products from "./pages/Product"
import Detail from "./pages/ProductDetail"
import Google from "./pages/GoogleCallBack"
import VerifyEmail from "./pages/VerifyEmail"
import Cart from "./pages/Cart"
import CheckOut from "./pages/Checkout"
import Brand from "./pages/Brand"
import ResetPassword from "./pages/ResetPassword"
import BrandDetail from "./pages/BrandDetail"
import NewArrival from "./pages/NewArrival"
import Category from "./pages/Category"

const App = () => {
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
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<Detail />} />
          <Route path="/google" element={<Google />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
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

          <Route
            path="/reset-password/:uid/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </MainWrapper>
    </BrowserRouter>
  )
}

export default App
