"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
  const [lastAction, setLastAction] = useState<{ type: string; flight?: Flight } | null>(null);

  useEffect(() => {
    if (!lastAction) return;

    if (lastAction.type === 'ADD_SUCCESS') {
      toast({
        title: "¡Vuelo agregado!",
        description: "Tu vuelo ha sido añadido a la reserva.",
      });
    } else if (lastAction.type === 'ADD_DUPLICATE' && lastAction.flight) {
      toast({
        title: "Vuelo ya en el carrito",
        description: "Este vuelo ya ha sido agregado a tu reserva.",
        variant: "destructive",
      });
    } else if (lastAction.type === 'REMOVE') {
      toast({
        title: "Vuelo eliminado",
        description: "El vuelo ha sido eliminado de tu reserva.",
      });
    } else if (lastAction.type === 'CLEAR') {
      toast({
        title: "Cesta vaciada",
        description: "Todos los vuelos han sido eliminados de tu reserva.",
      });
    }
    setLastAction(null);
  }, [lastAction, toast]);


  const addToCart = (flight: Flight) => {
    setCart((prevCart) => {
        const isAlreadyInCart = prevCart.some(item => item.id === flight.id);
        if (isAlreadyInCart) {
            setLastAction({ type: 'ADD_DUPLICATE', flight });
            return prevCart;
        }
        setLastAction({ type: 'ADD_SUCCESS', flight });
        return [...prevCart, flight]
    });
  };

  const removeFromCart = (flightId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== flightId));
    setLastAction({ type: 'REMOVE' });
  };

  const clearCart = () => {
    setCart([]);
    setLastAction({ type: 'CLEAR' });
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