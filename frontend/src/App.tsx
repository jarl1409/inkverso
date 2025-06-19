// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Configuracion from "./pages/Configuracion";
import Historial from "./pages/Historial";
import MisLibros from "./pages/admin/MisLibros";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CrudLibros from "./pages/admin/CrudLibros";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="historial" element={<Historial />} />
          <Route path="mis-libros" element={<MisLibros />} />
          <Route path="mis-libros/editar" element={<CrudLibros />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
