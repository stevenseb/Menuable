import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../context/Modal";
import CartModal from "../Cart/CartModal";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { setModalContent } = useModal();
  const navigate = useNavigate();

  const handleCartIconClick = () => {
    setModalContent(
      <CartModal
        onCheckout={(path) => {
          navigate(path);
        }}
      />
    );
  };

  return (
    <div className="cart-icon" onClick={handleCartIconClick}>
      <FontAwesomeIcon icon={faShoppingCart} />
      {cartItems.length > 0 && (
        <span className="cart-count">{cartItems.length} Items</span>
      )}
    </div>
  );
};

export default CartIcon;
