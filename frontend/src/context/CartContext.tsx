import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

// Modelo de un ítem en el carrito
export interface ItemCarrito {
  id: string;
  titulo: string;
  precio: number;
  cantidad: number;
  imagenURL: string;
}

// Contrato del contexto
interface CartContextType {
  carrito: ItemCarrito[];
  agregarAlCarrito: (item: ItemCarrito) => void;
  removerDelCarrito: (id: string) => void;
  vaciarCarrito: () => void;
  actualizarCantidad: (id: string, nuevaCantidad: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Lazy init: lee de localStorage solo en la primera renderización
  const [carrito, setCarrito] = useState<ItemCarrito[]>(() => {
    try {
      const stored = localStorage.getItem("carrito");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error("Error parseando carrito inicial:", e);
    }
    return [];
  });

  // Cada vez que 'carrito' cambie, lo guardamos
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (nuevo: ItemCarrito) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.id === nuevo.id);
      if (existe) {
        return prev.map((i) =>
          i.id === nuevo.id
            ? { ...i, cantidad: i.cantidad + nuevo.cantidad }
            : i
        );
      }
      return [...prev, nuevo];
    });
  };

  const removerDelCarrito = (id: string) =>
    setCarrito((prev) => prev.filter((i) => i.id !== id));

  const vaciarCarrito = () => setCarrito([]);

  const actualizarCantidad = (id: string, cantidad: number) =>
    setCarrito((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad } : i))
    );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        removerDelCarrito,
        vaciarCarrito,
        actualizarCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CartProvider>");
  return ctx;
}
