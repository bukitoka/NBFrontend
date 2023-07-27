import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Category from "./pages/Category";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/category" element={<Category />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App