"use client";

import { FlightCard } from './FlightCard';
import { type Flight } from '@/types';
import { Plane } from 'lucide-react';

interface FlightListProps {
  flights: Flight[];
  onBook: (flight: Flight) => void;
}

export function FlightList({ flights, onBook }: FlightListProps) {
  if (flights.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Plane className="mx-auto h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold">No se encontraron vuelos</h2>
        <p>Intenta cambiar tus criterios de búsqueda o revisa los datos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} onBook={onBook} />
      ))}
    </div>
  );
}