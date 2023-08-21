import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import MainWrapper from "./layouts/MainWrapper"
import PrivateRoute from "./layouts/PrivateWrapper"

// pages
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import UserProfile from "./pages/UserProfile"
import Logout from "./pages/Logout"
import Products from "./pages/Product"
import Detail from "./pages/ProductDetail"
import Google from "./pages/GoogleCallBack"
import VerifyEmail from "./pages/VerifyEmail"

const App = () => {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>
                    <Route
                        path="/account"
                        element={
                            <PrivateRoute>
                                <UserProfile />
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

                </Routes>
            </MainWrapper>
        </BrowserRouter>
    )
}

export default App
