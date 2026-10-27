'use client';

import React, { createContext, useContext, useEffect, useReducer, useRef, ReactNode } from 'react';
import { Product, CartItem, lineKey } from '@/types/product';
import { track, gaItem } from '@/lib/analytics';

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (product: Product, quantity: number) => void;
  /** Takes the line key (lineKey(product)). */
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'ma-cart-v1';

const cartReducer = (state: CartState, action: CartAction): CartState => {
  const priceOf = (p: Product) => (p.newPrice && p.newPrice > 0 ? p.newPrice : p.price);
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => lineKey(item.product) === lineKey(action.payload.product)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = state.items.map((item, i) =>
          i === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
        const total = updatedItems.reduce((sum, item) => sum + priceOf(item.product) * item.quantity, 0);
        return { items: updatedItems, total };
      } else {
        const newItems = [...state.items, { product: action.payload.product, quantity: action.payload.quantity }];
        const total = newItems.reduce((sum, item) => sum + priceOf(item.product) * item.quantity, 0);
        return { items: newItems, total };
      }
    }

    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => lineKey(item.product) !== action.payload);
      const total = filteredItems.reduce((sum, item) => sum + priceOf(item.product) * item.quantity, 0);
      return { items: filteredItems, total };
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.productId });
      }

      const updatedItems = state.items.map(item =>
        lineKey(item.product) === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + priceOf(item.product) * item.quantity, 0);
      return { items: updatedItems, total };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0 };

    case 'LOAD': {
      const items = action.payload;
      return { items, total: items.reduce((sum, item) => sum + priceOf(item.product) * item.quantity, 0) };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const loaded = useRef(false);

  // Keep the cart across page loads and visits (this browser only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const items = raw ? (JSON.parse(raw) as CartItem[]) : [];
      if (Array.isArray(items) && items.length) {
        dispatch({
          type: 'LOAD',
          payload: items.filter((i) => i?.product?._id && i.quantity > 0).slice(0, 50),
        });
      }
    } catch {
      // storage blocked or corrupt: start with an empty cart
    }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try {
      const slim = state.items.map(({ product: p, quantity }) => ({
        quantity,
        product: {
          _id: p._id,
          name: p.name,
          description: '',
          category: p.category,
          imageUrl: p.imageUrl,
          price: p.price,
          newPrice: p.newPrice,
          oldPrice: p.oldPrice,
          deviceCompatibility: p.deviceCompatibility,
          variantSku: p.variantSku,
          variantLabel: p.variantLabel,
          model: p.model,
        },
      }));
      localStorage.setItem(CART_KEY, JSON.stringify(slim));
    } catch {
      // ignore
    }
  }, [state.items]);

  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    const item = gaItem(product, quantity);
    track('add_to_cart', { value: (item.price || 0) * quantity, items: [item] });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemCount
    }}>
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
