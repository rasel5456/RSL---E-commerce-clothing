'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// একটা cart item এ কী কী তথ্য থাকবে তার টাইপ ডিফাইন করছি
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

// Context এ কী কী ফাংশন/ডাটা থাকবে
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // পেজ লোড হওয়ার সময় localStorage থেকে আগের cart ডাটা নিয়ে আসি
  useEffect(() => {
    const savedCart = localStorage.getItem('rsl_cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // cartItems পরিবর্তন হলেই localStorage এ সেভ করে রাখি
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('rsl_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // নতুন প্রোডাক্ট cart এ যোগ করা (একই সাইজ/কালার থাকলে quantity বাড়িয়ে দেয়)
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.size === item.size && i.color === item.color
      );

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // cart থেকে একটা আইটেম মুছে ফেলা
  const removeFromCart = (id: string, size: string, color: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.id === id && i.size === size && i.color === color))
    );
  };

  // quantity পরিবর্তন করা
  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size && i.color === color ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

// এই hook টা দিয়ে যেকোনো component থেকে cart access করা যাবে
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}