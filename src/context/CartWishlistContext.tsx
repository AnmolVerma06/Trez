import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  type?: string;
  brand?: string;
  size?: string;
  color?: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  type?: string;
  brand?: string;
}

interface CartWishlistState {
  cart: CartItem[];
  wishlist: WishlistItem[];
}

// Actions
type CartAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: number; size?: string; color?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; size?: string; color?: string; quantity: number } }
  | { type: 'CLEAR_CART' };

type WishlistAction = 
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: number }
  | { type: 'CLEAR_WISHLIST' };

type CartWishlistAction = CartAction | WishlistAction;

// Initial state
const initialState: CartWishlistState = {
  cart: [],
  wishlist: []
};

// Reducer
const cartWishlistReducer = (state: CartWishlistState, action: CartWishlistAction): CartWishlistState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingCartItem = state.cart.find(item => isSameCartItem(item, action.payload));
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            isSameCartItem(item, action.payload)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case 'REMOVE_FROM_CART':
      // action.payload is now an object: { id, size, color }
      return {
        ...state,
        cart: state.cart.filter(item => !isSameCartItem(item, action.payload as any))
      };

    case 'UPDATE_QUANTITY':
      // action.payload is now an object: { id, size, color, quantity }
      return {
        ...state,
        cart: state.cart.map(item =>
          isSameCartItem(item, action.payload as any)
            ? { ...item, quantity: Math.max(1, (action.payload as any).quantity) }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'ADD_TO_WISHLIST':
      const existingWishlistItem = state.wishlist.find(item => item.id === action.payload.id);
      if (existingWishlistItem) {
        return state; // Already in wishlist
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: []
      };

    default:
      return state;
  }
};

// Helper to uniquely identify a cart item by id, size, and color
const isSameCartItem = (a: CartItem, b: Partial<CartItem>) =>
  a.id === b.id && a.size === b.size && a.color === b.color;

// Context
interface CartWishlistContextType {
  state: CartWishlistState;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
  isInCart: (id: number, size?: string, color?: string) => boolean;
  isInWishlist: (id: number) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
  getWishlistCount: () => number;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

// Provider
export const CartWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartWishlistReducer, initialState, () => {
    // Load from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    return {
      cart: savedCart ? JSON.parse(savedCart) : [],
      wishlist: savedWishlist ? JSON.parse(savedWishlist) : []
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity: 1 } });
  };

  const removeFromCart = (id: number, size?: string, color?: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, size, color } });
  };

  const updateQuantity = (id: number, quantity: number, size?: string, color?: string) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, color, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToWishlist = (item: WishlistItem) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  };

  const removeFromWishlist = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  };

  const isInCart = (id: number, size?: string, color?: string) => {
    return state.cart.some((item: CartItem) => item.id === id && item.size === size && item.color === color);
  };

  const isInWishlist = (id: number) => {
    return state.wishlist.some((item: WishlistItem) => item.id === id);
  };

  const getCartTotal = () => {
    return state.cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.cart.reduce((count: number, item: CartItem) => count + item.quantity, 0);
  };

  const getWishlistCount = () => {
    return state.wishlist.length;
  };

  const value: CartWishlistContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInCart,
    isInWishlist,
    getCartTotal,
    getCartCount,
    getWishlistCount
  };

  return (
    <CartWishlistContext.Provider value={value}>
      {children}
    </CartWishlistContext.Provider>
  );
};

// Hook
export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (context === undefined) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
}; 