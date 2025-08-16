"use client";

import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from './ui/sheet';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Trash2 } from 'lucide-react';

export function CartSheet() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((total, flight) => total + flight.price, 0);

  return (
    <SheetContent className="flex flex-col">
      <SheetHeader>
        <SheetTitle>Tu Cesta de Vuelos</SheetTitle>
        <SheetDescription>
          Aquí están los vuelos que has seleccionado.
        </SheetDescription>
      </SheetHeader>
      <Separator />
      {cart.length > 0 ? (
        <>
          <ScrollArea className="flex-grow">
            <div className="flex flex-col gap-4 py-4">
              {cart.map((flight) => (
                <div key={flight.id} className="flex justify-between items-start gap-4">
                  <div className="flex-grow">
                    <p className="font-semibold">{flight.origin} → {flight.destination}</p>
                    <p className="text-sm text-muted-foreground">{flight.airline} - {flight.flightNumber}</p>
                    <p className="text-sm text-muted-foreground">{flight.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">${flight.price}</p>
                  </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(flight.id)}>
                      <Trash2 className="h-4 w-4" />
                   </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          <Separator />
          <SheetFooter className="mt-auto">
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="w-full" onClick={() => clearCart()}>Vaciar Cesta</Button>
                    <Button className="w-full bg-accent hover:bg-accent/90">Proceder al Pago</Button>
                </div>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <p className="text-muted-foreground">Tu cesta de vuelos está vacía.</p>
          <p className="text-sm text-muted-foreground">¡Añade vuelos para empezar a planificar tu viaje!</p>
        </div>
      )}
    </SheetContent>
  );
}
