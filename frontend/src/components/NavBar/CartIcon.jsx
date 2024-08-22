import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toggleCartModal } from '../../store/ui';

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleCartIconClick = () => {
    dispatch(toggleCartModal());
  };

  return (
    <div className="cart-icon" onClick={handleCartIconClick} >
      <FontAwesomeIcon icon={faShoppingCart} />
      {cartItems.length > 0 && (
        <span className="cart-count">{cartItems.length} Items</span>
      )}
    </div>
  );
};

export default CartIcon;
