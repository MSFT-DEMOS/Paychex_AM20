import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { 
  CartState, 
  CartAction, 
  CartActionType, 
  CartItem 
} from '../types/cart';
import { saveCartToStorage, loadCartFromStorage } from '../utils/cartStorage';

// Initial cart state
const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionType.ADD_TO_CART: {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.productId === product.productId
      );

      let newItems: CartItem[];
      
      if (existingItemIndex > -1) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          productId: product.productId,
          name: product.name,
          price: product.price,
          quantity: quantity,
          imgName: product.imgName,
          unit: product.unit
        };
        newItems = [...state.items, newItem];
      }

      return calculateCartTotals({ ...state, items: newItems });
    }

    case CartActionType.REMOVE_FROM_CART: {
      const newItems = state.items.filter(
        item => item.productId !== action.payload.productId
      );
      return calculateCartTotals({ ...state, items: newItems });
    }

    case CartActionType.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const newItems = state.items.filter(item => item.productId !== productId);
        return calculateCartTotals({ ...state, items: newItems });
      }

      const newItems = state.items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
      return calculateCartTotals({ ...state, items: newItems });
    }

    case CartActionType.CLEAR_CART: {
      return { ...initialCartState };
    }

    case CartActionType.LOAD_CART: {
      const loadedItems = action.payload.items;
      return calculateCartTotals({ ...state, items: loadedItems });
    }

    default:
      return state;
  }
};

// Helper function to calculate cart totals
const calculateCartTotals = (state: CartState): CartState => {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );

  return {
    ...state,
    totalItems,
    totalPrice
  };
};

// Cart context interface
interface CartContextType {
  cart: CartState;
  addToCart: (product: {
    productId: number;
    name: string;
    price: number;
    imgName: string;
    unit: string;
  }, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartDiscount: () => number;
  getShippingCost: () => number;
}

// Create cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartItems = loadCartFromStorage();
    if (savedCartItems.length > 0) {
      dispatch({
        type: CartActionType.LOAD_CART,
        payload: { items: savedCartItems }
      });
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage(cart.items);
  }, [cart.items]);

  // Cart action functions
  const addToCart = (product: {
    productId: number;
    name: string;
    price: number;
    imgName: string;
    unit: string;
  }, quantity: number) => {
    dispatch({
      type: CartActionType.ADD_TO_CART,
      payload: { product, quantity }
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({
      type: CartActionType.REMOVE_FROM_CART,
      payload: { productId }
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: CartActionType.UPDATE_QUANTITY,
      payload: { productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CartActionType.CLEAR_CART });
  };

  // Helper functions for cart calculations
  const getCartItemCount = (): number => cart.totalItems;
  const getCartTotal = (): number => cart.totalPrice;
  
  const getCartSubtotal = (): number => cart.totalPrice;
  
  const getCartDiscount = (): number => {
    // 5% discount as shown in design
    return cart.totalPrice * 0.05;
  };
  
  const getShippingCost = (): number => {
    // $10 flat shipping rate as shown in design
    return cart.totalItems > 0 ? 10 : 0;
  };

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
    getCartSubtotal,
    getCartDiscount,
    getShippingCost
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
