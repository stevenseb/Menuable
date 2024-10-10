import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/cart";

const BUNNY_CDN_URL = "https://comideria-russa.b-cdn.net/";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className="cart-item">
      <img src={`${BUNNY_CDN_URL}${item.imageUrl}`} alt={item.name} />
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>
          Size: {item.units} {item.measure}
        </p>
        <p>Price: ${item.price * item.quantity}</p>
        <button onClick={handleRemoveFromCart}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
