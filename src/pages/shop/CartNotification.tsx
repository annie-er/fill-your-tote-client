import React from "react";
import "./CartNotification.css";

interface CartNotificationProps {
  productName: string;
  quantity: number;
  onClose: () => void;
  onViewCart: () => void;
}

const CartNotification: React.FC<CartNotificationProps> = ({
  productName,
  quantity,
  onClose,
  onViewCart,
}) => {
  return (
    <div className="cart-notification">
      <button className="close-btn" onClick={onClose}>✕</button>
      <h4 className="cart-title">Added to your cart</h4>
      <p className="cart-item">{productName}</p>
      <p className="cart-qty">Qty: {quantity}</p>
      <button className="view-cart-btn" onClick={onViewCart}>
        View Cart
      </button>
    </div>
  );
};

export default CartNotification;
