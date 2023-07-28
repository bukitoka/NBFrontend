import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Category from "./pages/Category";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/category" element={<Category />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App