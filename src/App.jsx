import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HomePage from "./pages/home/home";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import CartContext from "./context/cartContext";



function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) ?? []);

  useEffect(() => {
    if (token === null) {
      navigate("/login");
      // window.location.href = "/login"
    } else {
      navigate("/home");
      // window.location.href = "/home"
    }
  }, []);


  return (
    <>
      <CartContext.Provider value={{ cart, setCart }}>
        <Toaster />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </CartContext.Provider>

      {/* <RegisterPage /> */}


    </>

  );
}

export default App;
