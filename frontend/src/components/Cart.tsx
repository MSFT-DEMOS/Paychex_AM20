import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    getCartSubtotal, 
    getCartDiscount, 
    getShippingCost 
  } = useCart();
  
  const [couponCode, setCouponCode] = useState('');

  // Calculate totals
  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getShippingCost();
  const grandTotal = subtotal - discount + shipping;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    // Mock coupon functionality - just for UI
    console.log('Applying coupon:', couponCode);
    // In a real app, this would validate and apply the coupon
  };

  const handleProceedToCheckout = () => {
    // Mock checkout functionality
    alert('Proceeding to checkout... (This is a demo)');
  };

  const handleUpdateCart = () => {
    // The cart is already updated in real-time, this is just for UI feedback
    alert('Cart updated successfully!');
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-dark pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="mb-8">
              <svg 
                className="mx-auto h-24 w-24 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 21h12M9 19a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-light mb-4">Your cart is empty</h2>
            <p className="text-gray-300 mb-8">Add some products to get started!</p>
            <Link 
              to="/products" 
              className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-light mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-light uppercase tracking-wider">
                        S. No.
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-light uppercase tracking-wider">
                        Product Image
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-light uppercase tracking-wider">
                        Product Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-light uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-light uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-light uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-light uppercase tracking-wider">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    {cart.items.map((item, index) => (
                      <tr key={item.productId} className="hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-light">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={`/${item.imgName}`} 
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder-product.png';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-light font-medium">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-light">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                              className="bg-gray-600 hover:bg-gray-500 text-light w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            >
                              -
                            </button>
                            <span className="bg-gray-700 text-light px-4 py-2 rounded-lg min-w-[60px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                              className="bg-gray-600 hover:bg-gray-500 text-light w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-light font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <svg 
                              className="h-5 w-5" 
                              fill="none" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth="2" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 text-light border border-gray-600 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>
              <button
                onClick={handleApplyCoupon}
                className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Apply Coupon
              </button>
              <button
                onClick={handleUpdateCart}
                className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Update Cart
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-light mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-light">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-light">
                  <span>Discount(5%)</span>
                  <span className="text-green-400">-${discount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-light">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                
                <hr className="border-gray-600" />
                
                <div className="flex justify-between text-light font-bold text-lg">
                  <span>Grand Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleProceedToCheckout}
                className="w-full mt-8 bg-primary hover:bg-accent text-white py-4 rounded-lg font-medium text-lg transition-colors"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
