// /cursos/Node.js---Bootcamp-Desarrollo-Web-inc.-MVC-y-REST-APIs/cliente-api/src/App.jsx

// Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Layout
import Header from "../src/components/layout/Header";
import Navegacion from "../src/components/layout/Navegacion";

// Componentes
import Clientes from "../src/components/clientes/Clientes";
import Nuevocliente from "../src/components/clientes/Nuevocliente";
import EditarCliente from "../src/components/clientes/EditarCliente";

import Productos from "../src/components/productos/Productos";
import NuevoProducto from "../src/components/productos/NuevoProducto";
import EditarProducto from "../src/components/productos/EditarProducto";
// Pedidos
import Pedidos from "../src/components/pedidos/Pedidos";
import NuevoPedido from "../src/components/pedidos/NuevoPedido";

// Login
import Login from "../src/components/auth/Login";

// Context
import { CRMContext, CRMProvider } from "./context/CRMContext";
import { useContext } from "react";

function App() {
  // Utilizar el context en el componente
  const [auth, setAuth] = useContext(CRMContext);

  return (
    <Router>
      <>
        <CRMProvider value={[auth, setAuth]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegacion />
            <main className="caja-contenido col-9">
              <Routes>
                <Route path="/" element={<Clientes />}></Route>
                <Route
                  exact
                  path="/clientes/nuevo"
                  element={<Nuevocliente />}
                ></Route>
                <Route
                  exact
                  path="/clientes/editar/:id"
                  element={<EditarCliente />}
                ></Route>

                <Route path="/productos" element={<Productos />}></Route>
                <Route
                  path="/productos/editar/:id"
                  element={<EditarProducto />}
                ></Route>
                <Route
                  path="/productos/nuevo"
                  element={<NuevoProducto />}
                ></Route>

                <Route path="/pedidos" element={<Pedidos />}></Route>
                <Route
                  path="/pedidos/nuevo/:id"
                  element={<NuevoPedido />}
                ></Route>
                <Route path="/iniciar-sesion" Component={Login} />
              </Routes>
            </main>
          </div>
        </CRMProvider>
      </>
    </Router>
  );
}

export default App;
