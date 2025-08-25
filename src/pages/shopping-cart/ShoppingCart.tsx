import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RestClient } from '../../RestClient';
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
  const navigate = useNavigate();

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

      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );

      await RestClient.updateCartItemQuantity(itemId, newQuantity);
      
      const updatedSummary = await RestClient.getCartSummary();
      setCartSummary(updatedSummary);
    } catch (err) {
      console.error('Error updating quantity:', err);
      fetchCartData();
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      setCartItems(prev => prev.filter(item => item.id !== itemId));

      await RestClient.removeCartItem(itemId);
      
      const updatedSummary = await RestClient.getCartSummary();
      setCartSummary(updatedSummary);
    } catch (err) {
      console.error('Error removing item:', err);
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

  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      navigate('/shop');
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
            onClick={handleContinueShopping}
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
            onClick={handleContinueShopping}
          >
            CONTINUE SHOPPING →
          </button>
        </div>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="cart-item">
                  <td data-label="Image">
                    <img src={item.image} alt={item.name} className="cart-product-image" />
                  </td>
                  <td data-label="Product">
                    <h3 className="product-name">{item.name}</h3>
                  </td>
                  <td data-label="Price" className="item-price">
                    €{item.price.toFixed(2)}
                  </td>
                  <td data-label="Quantity">
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
                  </td>
                  <td data-label="Total" className="item-total">
                    €{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td data-label="">
                    <button
                      className="remove-x-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {cartSummary && (
            <div className="cart-summary">
              <div className="order-summary">
                <div className="summary-line">
                  <span>GST</span>
                  <span>€{cartSummary.vatAmount.toFixed(2)}</span>
                </div>
                <div className="summary-line subtotal-line">
                  <span>Subtotal</span>
                  <span>€{cartSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-line total-line">
                  <span>Total</span>
                  <span>€{cartSummary.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="shipping-info">
                <p>Shipping is calculated at checkout.</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShoppingCart;