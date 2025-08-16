"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { type Flight } from '@/types';
import { useToast } from "@/hooks/use-toast"


interface CartContextType {
  cart: Flight[];
  addToCart: (flight: Flight) => void;
  removeFromCart: (flightId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Flight[]>([]);
  const { toast } = useToast()

  const addToCart = (flight: Flight) => {
    setCart((prevCart) => {
        const isAlreadyInCart = prevCart.some(item => item.id === flight.id);
        if (isAlreadyInCart) {
            toast({
              title: "Vuelo ya en el carrito",
              description: "Este vuelo ya ha sido agregado a tu reserva.",
              variant: "destructive",
            })
            return prevCart;
        }
        toast({
          title: "¡Vuelo agregado!",
          description: "Tu vuelo ha sido añadido a la reserva.",
        })
        return [...prevCart, flight]
    });
  };

  const removeFromCart = (flightId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== flightId));
    toast({
        title: "Vuelo eliminado",
        description: "El vuelo ha sido eliminado de tu reserva.",
      })
  };

  const clearCart = () => {
    setCart([]);
    toast({
        title: "Cesta vaciada",
        description: "Todos los vuelos han sido eliminados de tu reserva.",
      })
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
