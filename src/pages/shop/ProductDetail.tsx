import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RestClient } from '../../RestClient';
import CartNotification from "./CartNotification";
import './ProductDetail.css';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  price: number;
}

const ProductDetail: React.FC = () => {
  const { identifier } = useParams<{ identifier: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!identifier) return;
      
      try {
        setLoading(true);
        const data = await RestClient.getTote(identifier);
        setProduct(data);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [identifier]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await RestClient.addToCart(product.id.toString(), quantity);
      // alert('Added to cart!');
      setShowNotification(true);
      // setTimeout(() => setShowNotification(false), 3000);

    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <h2>Product Not Found</h2>
          <p>{error || 'The product you\'re looking for doesn\'t exist.'}</p>
          <button onClick={() => navigate('/shop')} className="back-button">
            Back to shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate('/shop')} className="close-button">
        ✕
      </button>
      
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-price">
            <span className="product-price-label">PRICE:</span> ${product.price}
          </div>
          <div className="purchase-section">
            <div className="quantity-row">
              <span className="quantity-label">QUANTITY:</span>
              <div className="product-quantity-controls">
                <button
                  className="product-quantity-btn"
                  onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="product-quantity-display">{quantity}</span>
                <button
                  className="product-quantity-btn"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="add-to-cart-button"
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>

        </div>
      </div>

      {showNotification && product && (
        <CartNotification
          productName={product.name}
          quantity={quantity}
          onClose={() => setShowNotification(false)}
          onViewCart={() => navigate("/cart")}
        />
      )}

    </div>
  );
};

export default ProductDetail;