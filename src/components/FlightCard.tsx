"use client";

import { type Flight } from '@/types';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Clock, Plane } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
  onBook: (flight: Flight) => void;
}

export function FlightCard({ flight, onBook }: FlightCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="flex items-center gap-4 col-span-1">
          <Plane className="w-8 h-8 text-muted-foreground" />
          <div>
            <p className="font-semibold">{flight.airline}</p>
            <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-center gap-2 col-span-1 md:col-span-2">
            <div className="text-center">
                <p className="font-bold text-lg">{flight.departureTime}</p>
                <p className="text-sm font-medium">{flight.origin}</p>
            </div>
            <div className="flex flex-col items-center text-muted-foreground">
              <p className="text-xs">{flight.duration}</p>
              <ArrowRight className="w-10 h-4"/>
              <p className="text-xs">Directo</p>
            </div>
            <div className="text-center">
                <p className="font-bold text-lg">{flight.arrivalTime}</p>
                <p className="text-sm font-medium">{flight.destination}</p>
            </div>
        </div>

        <div className="flex md:flex-col items-center justify-between md:justify-center col-span-1 md:text-right">
            <div className="text-left md:text-right">
                <p className="text-lg font-bold text-primary">${flight.price}</p>
                <p className="text-sm text-muted-foreground">por pasajero</p>
            </div>
            <Button onClick={() => onBook(flight)} className="mt-0 md:mt-2 bg-accent hover:bg-accent/90 text-accent-foreground">
                Reservar
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
