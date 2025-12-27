import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Appointments from "./pages/Appointments";
import Medicines from "./pages/Medicines";
import Layout from "./components/Layout";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
