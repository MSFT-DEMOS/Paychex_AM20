import { CartItem } from '../types/cart';

const CART_STORAGE_KEY = 'octocat-cart';

/**
 * Save cart items to localStorage
 * @param cartItems Array of cart items to save
 */
export const saveCartToStorage = (cartItems: CartItem[]): void => {
  try {
    const cartData = JSON.stringify(cartItems);
    localStorage.setItem(CART_STORAGE_KEY, cartData);
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
    // Handle localStorage quota exceeded or other errors
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      // Try to clear some space or notify user
      console.warn('localStorage quota exceeded. Cart data could not be saved.');
    }
  }
};

/**
 * Load cart items from localStorage
 * @returns Array of cart items or empty array if none found/invalid
 */
export const loadCartFromStorage = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) {
      return [];
    }

    const parsedData = JSON.parse(cartData);
    
    // Validate that the loaded data is an array of cart items
    if (!Array.isArray(parsedData)) {
      console.warn('Invalid cart data format in localStorage');
      return [];
    }

    // Validate each cart item structure
    const validCartItems = parsedData.filter(item => 
      isValidCartItem(item)
    );

    // If some items were invalid, save the cleaned data back
    if (validCartItems.length !== parsedData.length) {
      console.warn('Some invalid cart items were removed from localStorage');
      saveCartToStorage(validCartItems);
    }

    return validCartItems;
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
    return [];
  }
};

/**
 * Validate cart item structure
 * @param item Object to validate as CartItem
 * @returns boolean indicating if item is valid
 */
const isValidCartItem = (item: any): item is CartItem => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.productId === 'number' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number' &&
    typeof item.imgName === 'string' &&
    typeof item.unit === 'string' &&
    item.quantity > 0 &&
    item.price >= 0
  );
};

/**
 * Clear cart data from localStorage
 */
export const clearCartFromStorage = (): void => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cart from localStorage:', error);
  }
};
