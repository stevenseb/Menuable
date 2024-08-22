import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEdit, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { fetchMenuItems } from '../../store/item';
import { addToCart } from '../../store/cart';
import './DisplayMenu.css';

const BUNNY_CDN_URL = 'https://comideria-russa.b-cdn.net/';

const DisplayMenu = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.menu.items);
  const status = useSelector((state) => state.menu.status);
  const error = useSelector((state) => state.menu.error);
  const loggedInUser = useSelector((state) => state.session.user);
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenuItems());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const hasUserReviewed = (item) => {
    if (!Array.isArray(item.reviews)) {
      return false;
    }
    return item.reviews.some(review => review.userId === loggedInUser?.id);
  };
  
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setAddedToCart(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedToCart(prev => ({ ...prev, [item.id]: false })), 800);
  };

  const getItemQuantityInCart = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div>
    <div className="siteDescription">
        <h2>Artisan Slavic Foods and Argentine Goodness</h2>
        <h3>Delivered to Your Door</h3>
        </div>
      <div className="menu-container">
        {items.map((item) => {
          const averageRating = item.numRatings > 0 ? (item.stars / item.numRatings).toFixed(1) : null;
          const quantityInCart = getItemQuantityInCart(item.id);
          return (
            <div key={item.id} className="menu-card">
              <img 
                src={`${BUNNY_CDN_URL}${item.imageFilename}`} 
                alt={item.name} 
                className="menu-image" 
              />
              <div className="menu-details">
                <h2>{item.name}</h2>
                <p className="text">{item.description}</p>
                <p className="price">Price: ${item.price} for {item.quantity} {item.measure}</p>
                <p className="quantity">Quantity Available: {item.quantityOnHand}</p>
                <p className="text">
                  {averageRating ? (
                    <>
                      Community rating: {averageRating}
                      <FontAwesomeIcon icon={faStar} style={{ color: 'gold', marginLeft: '5px' }} />
                    </>
                  ) : (
                    'No reviews yet'
                  )}
                </p>
                {loggedInUser && !hasUserReviewed(item) && (
                  <p className="text leave-review">
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                    Leave a review
                  </p>
                )}
              </div>
              {quantityInCart > 0 && (
                <p className="in-cart">In cart: {quantityInCart}</p>
              )}
              <div className="buttonWrapper">
              <button 
                className={`addToCart ${addedToCart[item.id] ? 'added' : ''}`} 
                onClick={() => handleAddToCart(item)}
                disabled={addedToCart[item.id]}
              >
                {addedToCart[item.id] ? 'Added!' : 'Add to Cart'}
                <FontAwesomeIcon icon={faShoppingCart} style={{ marginLeft: '5px' }} />
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayMenu;
