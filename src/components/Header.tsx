"use client";

import { useCart } from '@/context/CartContext';
import { ShoppingCart, PlaneTakeoff } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const { cart } = useCart();

  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <PlaneTakeoff className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-foreground">AviaSim</h1>
          </div>
          <div className="relative">
             <Button variant="ghost" size="icon">
                <ShoppingCart className="w-6 h-6 text-foreground" />
             </Button>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
