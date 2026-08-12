"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(function () {
    const saved = localStorage.getItem("rsl_wishlist");
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  useEffect(function () {
    if (isLoaded) {
      localStorage.setItem("rsl_wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoaded]);

  const isInWishlist = function (id) {
    return wishlistItems.some(function (item) { return item.id === id; });
  };

  const toggleWishlist = function (item) {
    setWishlistItems(function (prev) {
      const exists = prev.some(function (i) { return i.id === item.id; });
      if (exists) {
        return prev.filter(function (i) { return i.id !== item.id; });
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = function (id) {
    setWishlistItems(function (prev) {
      return prev.filter(function (i) { return i.id !== id; });
    });
  };

  const totalWishlistItems = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, isInWishlist, toggleWishlist, removeFromWishlist, totalWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
