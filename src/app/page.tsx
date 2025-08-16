"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { SearchForm, SearchCriteria } from '@/components/SearchForm';
import { FlightList } from '@/components/FlightList';
import { BookingModal } from '@/components/BookingModal';
import { CartProvider } from '@/context/CartContext';
import { type Flight } from '@/types';
import flightsData from '@/data/flights.json';
import { format } from 'date-fns';

export default function Home() {
  const [allFlights, setAllFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call.
    // For this prototype, we load from a local JSON import.
    setAllFlights(flightsData as Flight[]);
  }, []);

  const airports = useMemo(() => {
    const originAirports = allFlights.map((flight) => flight.origin);
    const destinationAirports = allFlights.map((flight) => flight.destination);
    return [...new Set([...originAirports, ...destinationAirports])].sort();
  }, [allFlights]);

  const handleSearch = (criteria: SearchCriteria) => {
    setIsSearching(true);
    const results = allFlights.filter((flight) => {
      const isOriginMatch = criteria.origin ? flight.origin === criteria.origin : true;
      const isDestinationMatch = criteria.destination ? flight.destination === criteria.destination : true;
      const isDateMatch = criteria.date ? flight.date === format(criteria.date, 'yyyy-MM-dd') : true;
      return isOriginMatch && isDestinationMatch && isDateMatch;
    });
    setFilteredFlights(results);
  };

  const handleBook = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const handleCloseModal = () => {
    setSelectedFlight(null);
  };

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} airports={airports} />
            <FlightList flights={filteredFlights} onBook={handleBook} isSearching={isSearching} />
          </div>
        </main>
        <BookingModal flight={selectedFlight} onClose={handleCloseModal} />
      </div>
    </CartProvider>
  );
}
