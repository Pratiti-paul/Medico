
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
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && role === "admin" ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ToastContainer position="top-right" autoClose={3000} />
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
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </Route>

           {/* Admin Routes */}
           <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
             <Route path="dashboard" element={<AdminDashboard />} />
           </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
