import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/home";


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>

      {/* <RegisterPage /> */}


    </>

  );
}

export default App;
