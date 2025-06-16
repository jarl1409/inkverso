import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Index from "./pages/Index"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Index/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="*" element={"Pagina no encontrada"} />
    </Routes>
  );
}

export default App;
