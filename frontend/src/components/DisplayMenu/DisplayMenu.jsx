import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEdit, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { fetchMenuItems } from '../../store/item';
import { fetchReviewsForItems } from '../../store/review';
import { addToCart } from '../../store/cart';
import { useModal } from '../../context/Modal';
import CreateReviewModal from '../CreateReviewModal';
import ReviewsModal from '../ReviewsModal';
import './DisplayMenu.css';

const BUNNY_CDN_URL = 'https://comideria-russa.b-cdn.net/';

const DisplayMenu = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.menu.items);
  const status = useSelector((state) => state.menu.status);
  const loggedInUser = useSelector((state) => state.session.user);
  const cartItems = useSelector((state) => state.cart.items);
  const allReviews = useSelector((state) => state.review.reviews);
  const [addedToCart, setAddedToCart] = useState({});
  const { setModalContent } = useModal();

  const openCreateReviewModal = (itemId) => {
    if (hasUserReviewed(items.find(item => item.id === itemId))) {
      alert("You have already reviewed this item.");
    } else {
      setModalContent(
        <CreateReviewModal 
          itemId={itemId} 
          userId={loggedInUser.id} 
          onClose={() => setModalContent(null)} 
        />
      );
    }
  };

  const openReviewsModal = (item) => {
    setModalContent(
      <ReviewsModal 
        item={item}
        onClose={() => setModalContent(null)} 
      />
    );
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMenuItems());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (items.length > 0) {
      const itemIds = items.map(item => item.id);
      dispatch(fetchReviewsForItems(itemIds));
    }
  }, [items, dispatch]);

  const calculateAverageRating = useMemo(() => {
    return (itemId) => {
      const itemReviews = allReviews[itemId];
      if (!itemReviews || itemReviews.length === 0) return null;
      const totalRating = itemReviews.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / itemReviews.length).toFixed(1);
    };
  }, [allReviews]);

  const hasUserReviewed = useMemo(() => {
    return (itemId) => {
      const itemReviews = allReviews[itemId];
      if (!itemReviews) return false;
      return itemReviews.some(review => review.userId === loggedInUser?.id);
    };
  }, [allReviews, loggedInUser]);
  
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
          const averageRating = calculateAverageRating(item.id);
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
                <div className="rating">
                <p className="text">
                  {averageRating ? (
                    <>
                      Community rating: {averageRating}
                      <FontAwesomeIcon 
                      icon={faStar} 
                      style={{ color: 'gold', marginLeft: '5px' }} 
                      onClick={() => openReviewsModal(item)}
                      />
                    </>
                  ) : (
                    'No reviews yet'
                  )}
                </p>
                </div>
                {loggedInUser && !hasUserReviewed(item.id) && (
                    <p className="text leave-review">
                        <FontAwesomeIcon icon={faEdit} className='create-review' onClick={() => openCreateReviewModal(item.id)} />
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
