import React, { createContext, useContext } from 'react';

// Crea la instancia una sola vez
const formatterCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// El contexto llevará esa instancia
const FormatterContext = createContext(formatterCOP);

// Provider para envolver tu App
export const FormatterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <FormatterContext.Provider value={formatterCOP}>
    {children}
  </FormatterContext.Provider>
);

// Hook para consumirlo en cualquier componente
export const useFormatter = () => useContext(FormatterContext);
