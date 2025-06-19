# Shopping Cart Implementation Plan

## Overview
Implement a comprehensive shopping cart system with cart page, navigation icon with badge, and full cart state management.

## Implementation Phases

### ✅ Phase 1: Foundation Setup
- [x] **Create Cart Types** (`src/types/cart.ts`)
  - [x] Define `CartItem` interface with productId, name, price, quantity, imgName
  - [x] Define `CartState` interface with items, totalItems, totalPrice
  - [x] Define cart action types for TypeScript safety

- [x] **Create Cart Storage Utilities** (`src/utils/cartStorage.ts`)
  - [x] Implement `saveCartToStorage(cartItems: CartItem[]): void`
  - [x] Implement `loadCartFromStorage(): CartItem[]`
  - [x] Add error handling for localStorage quota exceeded
  - [x] Add data validation for loaded cart items

### ✅ Phase 2: Cart State Management
- [x] **Implement CartContext** (`src/context/CartContext.tsx`)
  - [x] Create CartContext with React.createContext
  - [x] Implement CartProvider component with useReducer or useState
  - [x] Implement cart actions:
    - [x] `addToCart(product: Product, quantity: number): void`
    - [x] `removeFromCart(productId: number): void`
    - [x] `updateQuantity(productId: number, quantity: number): void`
    - [x] `clearCart(): void`
  - [x] Calculate derived state (totalItems, totalPrice, subtotal)
  - [x] Integrate localStorage persistence on state changes
  - [x] Create custom hook `useCart()` for consuming context

- [x] **Integrate CartProvider** (`src/App.tsx`)
  - [x] Import CartProvider
  - [x] Wrap application with CartProvider (inside AuthProvider)
  - [x] Ensure proper context hierarchy

### ✅ Phase 3: Navigation Integration
- [x] **Update Navigation Component** (`src/components/Navigation.tsx`)
  - [x] Import `useCart` hook
  - [x] Add cart icon (shopping cart SVG) next to login/logout section
  - [x] Add cart item count badge on cart icon
  - [x] Style badge with primary color and white text
  - [x] Make cart icon clickable (Link to `/cart`)
  - [x] Add responsive behavior for mobile screens
  - [x] Hide badge when cart is empty

### ✅ Phase 4: Cart Page Implementation
- [x] **Create Cart Component** (`src/components/Cart.tsx`)
  - [x] Import `useCart` hook and cart types
  - [x] Implement empty cart state with message and link to products
  - [x] Create cart items table/grid layout:
    - [x] Product image display
    - [x] Product name and description
    - [x] Unit price display
    - [x] Quantity controls (-, +, remove button)
    - [x] Line total calculation
  - [x] Implement order summary section:
    - [x] Subtotal calculation
    - [x] Discount application (5% as shown in design)
    - [x] Shipping cost ($10 flat rate)
    - [x] Grand total calculation
  - [x] Add coupon code input section:
    - [x] Text input for coupon code
    - [x] "Apply Coupon" button (UI only)
  - [x] Add cart action buttons:
    - [x] "Update Cart" button
    - [x] "Proceed to Checkout" button (mock functionality)
  - [x] Style with Tailwind CSS matching design mockup
  - [x] Add loading states for cart operations

- [x] **Add Cart Route** (`src/App.tsx`)
  - [x] Add `/cart` route in Routes configuration
  - [x] Import Cart component

### ✅ Phase 5: Products Integration
- [x] **Update Products Component** (`src/components/entity/product/Products.tsx`)
  - [x] Import `useCart` hook
  - [x] Replace `alert()` in `handleAddToCart` with actual cart addition
  - [x] Call `addToCart(product, quantity)` from cart context
  - [x] Add success feedback (toast or temporary message)
  - [x] Reset quantity to 0 after successful addition
  - [x] Handle potential errors (product not found, etc.)

### ✅ Phase 6: Enhancement and Polish
- [ ] **User Experience Improvements**
  - [ ] Add cart item addition animations
  - [ ] Add loading states for cart operations
  - [ ] Add confirmation dialogs for item removal
  - [ ] Add cart item count animation on navbar badge
  - [ ] Implement optimistic updates for better UX

- [ ] **Error Handling**
  - [ ] Handle localStorage quota exceeded errors
  - [ ] Handle invalid cart data gracefully
  - [ ] Add error boundaries for cart components
  - [ ] Add fallback UI for cart loading failures

- [ ] **Responsive Design**
  - [ ] Ensure cart page works on mobile devices
  - [ ] Test cart icon visibility on small screens
  - [ ] Optimize cart table for mobile display
  - [ ] Test touch interactions on mobile

### ✅ Phase 7: Testing and Validation
- [ ] **Unit Testing**
  - [ ] Test cart context actions (add, remove, update)
  - [ ] Test cart calculations (totals, discounts)
  - [ ] Test localStorage integration
  - [ ] Test cart item count calculations

- [ ] **Integration Testing**
  - [ ] Test cart icon updates when items are added
  - [ ] Test navigation between products and cart pages
  - [ ] Test cart persistence across browser sessions
  - [ ] Test cart functionality with different user states

- [ ] **User Acceptance Testing**
  - [ ] Verify cart matches design specifications
  - [ ] Test full user flow (browse → add to cart → view cart)
  - [ ] Verify cart calculations are accurate
  - [ ] Test cart behavior on browser refresh

## Technical Specifications

### Cart Item Structure
```typescript
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imgName: string;
  unit: string;
}
```

### Key Features
- **Persistence**: Cart items saved to localStorage
- **Real-time Updates**: Cart icon badge updates immediately
- **Responsive Design**: Works on desktop and mobile
- **Error Handling**: Graceful degradation for storage issues
- **Type Safety**: Full TypeScript integration

### Dependencies
- No new dependencies required
- Uses existing React, React Router, and Tailwind CSS
- Leverages existing context pattern from AuthContext

## Success Criteria
- [ ] Users can add products to cart from Products page
- [ ] Cart icon shows accurate item count
- [ ] Cart page displays all cart items with correct calculations
- [ ] Cart persists across browser sessions
- [ ] All functionality works responsively on mobile devices
- [ ] Cart integrates seamlessly with existing application design
