
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Appointments from "./pages/Appointments";
import DoctorProfile from "./pages/DoctorProfile";
import MyProfile from "./pages/MyProfile";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/appointments/:docId" element={<DoctorProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
