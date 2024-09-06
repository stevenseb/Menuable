import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  increaseItemQuantity, 
  decreaseItemQuantity, 
  removeFromCart,
  loadCart
} from '../../store/cart';
import SignupFormModal from '../SignupFormModal';
import { useModal } from '../../context/Modal';

import './CartModal.css';

const CartModal = ({ onCheckout }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.session.user);
  const { closeModal, setModalContent } = useModal();
  const modalRef = useRef();

  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseItemQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseItemQuantity(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  document.addEventListener('mousedown', handleClickOutside);

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const handleCheckout = () => {
    closeModal();
    if (user) {
      onCheckout('/checkout');
    } else {
      setModalContent(<SignupFormModal />);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container" ref={modalRef}>
        <div className="cart-modal-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={closeModal}>
            Close
          </button>
        </div>
        <div className="cart-modal-body">
          {cartItems.length === 0 ? (
            <p className="empty">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="item-info">
                  <p>{item.name} x {item.quantity}</p>
                  <p>
                    ${item.price} per {item.units} {item.measure} 
                  </p>
                </div>
                <div className="item-actions">
                  <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                  <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                  <button onClick={() => handleRemoveFromCart(item)} className="black" >Remove</button>
                </div>
                <div className="subtotals">
                <p className="item-subtotal">Subtotal: ${calculateSubtotal(item).toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-modal-footer">
          <p>Total: ${calculateTotal().toFixed(2)}</p>
          <button 
          onClick={handleCheckout} 
          className='footerButton'
          disabled={cartItems.length === 0} 
          >
            {user ? 'Checkout' : 'Sign In / Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
