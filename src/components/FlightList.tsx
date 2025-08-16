"use client";

import { FlightCard } from './FlightCard';
import { type Flight } from '@/types';
import { Plane } from 'lucide-react';

interface FlightListProps {
  flights: Flight[];
  onBook: (flight: Flight) => void;
  isSearching: boolean;
}

export function FlightList({ flights, onBook, isSearching }: FlightListProps) {
  if (!isSearching) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <Plane className="mx-auto h-12 w-12 mb-4" />
        <h2 className="text-xl font-semibold">Comienza tu búsqueda</h2>
        <p>Ingresa tus criterios de viaje para encontrar los mejores vuelos.</p>
      </div>
    );
  }

  if (flights.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <h2 className="text-xl font-semibold">No se encontraron vuelos</h2>
        <p>Intenta cambiar tus criterios de búsqueda.</p>
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
