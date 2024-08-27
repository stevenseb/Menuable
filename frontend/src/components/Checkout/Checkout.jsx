import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserInfo } from '../../store/session';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../store/order';
import './Checkout.css';


const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.session.user);
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(user?.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || '');
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signup');
    }
  }, [user, navigate]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateUserInfo(user.id, { address, phone: phoneNumber }));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user information:', error);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handlePlaceOrder = async () => {
  const routeId = 1; // TODO GET ROUTE ID ASSIGNED BY WEEKLY DELIVERY
  const total = calculateTotal();
  const orderDate = new Date().toISOString();

  const itemsForOrder = cartItems.map(item => ({
    id: item.id,
    quantity: item.quantity,
  }));
console.log(itemsForOrder);
  try {
    await dispatch(createOrder({ routeId, total, orderDate, items: itemsForOrder }));
    // Clear the cart and navigate to a confirmation page
    // dispatch(clearCart());
    navigate('/order-confirmation');
  } catch (error) {
    console.error('Failed to place order:', error);
  }
};

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="checkout-page">
      <h2>Your Pending Order</h2>
      <div className="order-summary">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <p className="col1">{item.name}</p>
            <p className="col2">${item.price} x {item.units}</p>
            <p className="col3">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <p className="total">Total: ${calculateTotal().toFixed(2)}</p>
      </div>
      <div className="user-info">
        <h3>Delivery Information</h3>
        {isEditing ? (
          <>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p className="contact">Address: {user.address}</p>
            <p className="contact">Phone Number: {user.phone}</p>
            {!isConfirmed && <button onClick={handleEdit}>Edit</button>}
            {!isConfirmed && <p className="update">Please update and/or confirm your information!</p>}
          </>
        )}
      </div>
      {!isConfirmed && <button onClick={handleConfirm}>Confirm Information</button>}
      {isConfirmed && <button onClick={handlePlaceOrder}>Place Order</button>}
    </div>
  );
};

export default CheckoutPage;
