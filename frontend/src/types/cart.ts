// Cart item interface representing a product in the cart
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgName: string;
  unit: string;
}

// Cart state interface for managing cart data
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Cart action types for TypeScript safety
export enum CartActionType {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
  LOAD_CART = 'LOAD_CART'
}

// Cart action interfaces
export interface AddToCartAction {
  type: CartActionType.ADD_TO_CART;
  payload: {
    product: {
      productId: number;
      name: string;
      price: number;
      imgName: string;
      unit: string;
    };
    quantity: number;
  };
}

export interface RemoveFromCartAction {
  type: CartActionType.REMOVE_FROM_CART;
  payload: { productId: number };
}

export interface UpdateQuantityAction {
  type: CartActionType.UPDATE_QUANTITY;
  payload: { productId: number; quantity: number };
}

export interface ClearCartAction {
  type: CartActionType.CLEAR_CART;
}

export interface LoadCartAction {
  type: CartActionType.LOAD_CART;
  payload: { items: CartItem[] };
}

export type CartAction = 
  | AddToCartAction 
  | RemoveFromCartAction 
  | UpdateQuantityAction 
  | ClearCartAction 
  | LoadCartAction;
