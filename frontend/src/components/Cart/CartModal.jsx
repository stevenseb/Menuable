import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartModal } from '../../store/ui';
import { 
  increaseItemQuantity, 
  decreaseItemQuantity, 
  removeFromCart,
  loadCart
} from '../../store/cart';
import { useModal } from '../../context/Modal';
import './CartModal.css';

const CartModal = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isCartModalOpen = useSelector((state) => state.ui.isCartModalOpen);
  const { setModalContent, closeModal } = useModal();

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    dispatch(loadCart());
  }, [dispatch]);

  // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     dispatch(saveCart(cartItems));
//   }, [cartItems, dispatch]);

  const handleCloseModal = () => {
    dispatch(toggleCartModal());
    closeModal();
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseItemQuantity(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseItemQuantity(item));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const calculateSubtotal = (item) => {
  return item.price * item.quantity;
};

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  const modalContent = (
    <div className="cart-modal-content">
      <div className="cart-modal-header">
        <h2>Your Cart</h2>
        <button className="close-button" onClick={handleCloseModal}>
          Close
        </button>
      </div>
      <div className="cart-modal-body">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-info">
                <p>{item.name}</p>
                <p>
                  ${item.price} x {item.quantity} {item.measure}
                </p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </div>
              <p>Subtotal: ${calculateSubtotal(item).toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
      <div className="cart-modal-footer">
        <p>Total: ${calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );

  useEffect(() => {
    if (isCartModalOpen) {
      setModalContent(modalContent);
    } else {
      closeModal();
    }
  }, [isCartModalOpen, setModalContent, modalContent, closeModal]);

  return null;
};

export default CartModal;
