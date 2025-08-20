// ShoppingCart.tsx
import React, { useState, useEffect } from 'react';
import { RestClient } from '../RestClient';
import './ShoppingCart.css';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartSummary {
  subtotal: number;
  vatAmount: number;
  total: number;
}

interface ShoppingCartProps {
  onContinueShopping?: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  onContinueShopping
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const [items, summary] = await Promise.all([
        RestClient.getCartItems(),
        RestClient.getCartSummary()
      ]);
      setCartItems(items);
      setCartSummary(summary);
      setError(null);
    } catch (err) {
      setError('Failed to load cart data');
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      if (newQuantity === 0) {
        await handleRemoveItem(itemId);
        return;
      }

      // Optimistic update
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Update backend
      await RestClient.updateCartItemQuantity(itemId, newQuantity);
      
      // Refresh cart summary
      const updatedSummary = await RestClient.getCartSummary();
      setCartSummary(updatedSummary);
    } catch (err) {
      console.error('Error updating quantity:', err);
      // Revert optimistic update on error
      fetchCartData();
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      // Optimistic update
      setCartItems(prev => prev.filter(item => item.id !== itemId));

      // Update backend
      await RestClient.removeCartItem(itemId);
      
      // Refresh cart summary
      const updatedSummary = await RestClient.getCartSummary();
      setCartSummary(updatedSummary);
    } catch (err) {
      console.error('Error removing item:', err);
      // Revert optimistic update on error
      fetchCartData();
    }
  };



  const handleQuantityButtonClick = (itemId: string, change: number) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      handleQuantityChange(itemId, newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="shopping-cart">
        <div className="cart-header">
          <h1>YOUR CART</h1>
        </div>
        <div className="loading">Loading your cart...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shopping-cart">
        <div className="cart-header">
          <h1>YOUR CART</h1>
        </div>
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchCartData} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const isEmpty = cartItems.length === 0;

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h1>YOUR CART</h1>
        {!isEmpty && (
          <button 
            className="continue-shopping-link"
            onClick={onContinueShopping}
          >
            CONTINUE SHOPPING
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="empty-cart">
          <p>Your cart is currently empty.</p>
          <button 
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            CONTINUE SHOPPING →
          </button>
        </div>
      ) : (
        <>
          <div className="cart-table">
            <div className="cart-table-header">
              <div className="product-col">PRODUCT</div>
              <div className="price-col">PRICE</div>
              <div className="quantity-col">QUANTITY</div>
              <div className="total-col">TOTAL</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="product-info">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="product-image" />
                  )}
                  <div className="product-details">
                    <h3 className="product-name">{item.name}</h3>
                    {item.description && (
                      <p className="product-description">{item.description}</p>
                    )}
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>

                <div className="item-price">
                  €{item.price.toFixed(2)}
                </div>

                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityButtonClick(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityButtonClick(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  €{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {cartSummary && (
            <div className="cart-summary">
              <div className="order-summary">
                <div className="summary-line">
                  <span>-20% VAT</span>
                  <span>-€{cartSummary.vatAmount.toFixed(2)}</span>
                </div>
                <div className="summary-line subtotal-line">
                  <span>Subtotal</span>
                  <span>€{cartSummary.total.toFixed(2)}</span>
                </div>
                <div className="summary-line total-line">
                  <span>€{cartSummary.subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="gift-cards-note">
                Gift Cards are applied on the next page
              </div>

              <div className="shipping-info">
                <p><a href="#" className="shipping-link">Shipping</a> is calculated at checkout.</p>
                
                <p>US customers: the US government will charge you at least 15% additional tariffs on your order.</p>
                
                <p>UK customers: VAT is deducted for orders over €156.</p>
                
                <p>Other non-EU customers: VAT is deducted at checkout.</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;