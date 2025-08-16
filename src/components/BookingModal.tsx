"use client";

import { type Flight } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface BookingModalProps {
  flight: Flight | null;
  onClose: () => void;
}

export function BookingModal({ flight, onClose }: BookingModalProps) {
  const { addToCart } = useCart();

  if (!flight) {
    return null;
  }

  const handleConfirm = () => {
    addToCart(flight);
    onClose();
  };

  const flightDate = new Date(flight.date.replace(/-/g, '/'));

  return (
    <Dialog open={!!flight} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar tu reserva</DialogTitle>
          <DialogDescription>
            Revisa los detalles de tu vuelo antes de confirmar.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-muted-foreground">Aerolínea</span>
            <span className="font-bold">{flight.airline}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-muted-foreground">Vuelo</span>
            <span className="font-bold">{flight.flightNumber}</span>
          </div>
           <div className="flex justify-between items-center">
            <span className="font-semibold text-muted-foreground">Ruta</span>
            <span className="font-bold">{flight.origin} → {flight.destination}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-muted-foreground">Fecha</span>
            <span className="font-bold">{format(flightDate, "EEEE, d 'de' MMMM, yyyy", { locale: es })}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-muted-foreground">Salida</span>
            <span className="font-bold">{flight.departureTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-muted-foreground">Llegada</span>
            <span className="font-bold">{flight.arrivalTime}</span>
          </div>
          <div className="border-t my-4"></div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold text-muted-foreground">Precio Total</span>
            <span className="font-extrabold text-primary">${flight.price}</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleConfirm} className="bg-accent hover:bg-accent/90 text-accent-foreground">Confirmar Reserva</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
