import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";

import { AuthProvider } from "./context/AuthContext.tsx";
import { CartProvider } from "./context/CartContext";
import { FormatterProvider } from "./context/FormatterContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <FormatterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FormatterProvider>
    </AuthProvider>
  </StrictMode>
);
