import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/layout/PublicLayout";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { PublicRoutes, PrivateRoutes } from "./routes";

import Index from "./pages/Index";
import LibroDetalle from "./pages/libros/LibroDetalle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Configuracion from "./pages/Configuracion";
import MisLibros from "./pages/admin/MisLibros";
import EditarLibro from "./pages/admin/EditarLibro";
import CrearLibro from "./pages/admin/CrearLibro";
import Cart from "./pages/Cart";
import Pago from "./pages/Pago";
import UsuariosPage from "./pages/admin/Usuarios";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={PublicRoutes.index} element={<Index />} />
        <Route path={PublicRoutes.libroDetalle()} element={<LibroDetalle />} />
      </Route>
      <Route path={PublicRoutes.login} element={<Login />} />
      <Route path={PublicRoutes.register} element={<Register />} />

      {/* — PROTEGIDAS — */}
      <Route
        path={PrivateRoutes.home}
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="configuracion" element={<Configuracion />} />
        <Route path="mis-libros" element={<MisLibros />} />
        <Route path="usuarios" element={<UsuariosPage />} />
        <Route path="mis-libros/crear" element={<CrearLibro />} />
        <Route path="mis-libros/editar/:id" element={<EditarLibro />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Pago />} />
      </Route>
    </Routes>
  );
}
