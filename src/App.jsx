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

const App = () => {
    return (
        <BrowserRouter>
            <MainWrapper>
                <Routes>
                    <Route
                        path="/profile"
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
                </Routes>
            </MainWrapper>
        </BrowserRouter>
    )
}

export default App