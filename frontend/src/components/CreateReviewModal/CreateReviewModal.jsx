import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/review';
import './CreateReviewModal.css';

const CreateReviewModal = ({ itemId, userId, onClose }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSubmitDisabled(rating === 0 || content.trim() === '');
  }, [rating, content]);

  const handleStarClick = (star) => {
    setRating(star);
  };

  const handleStarHover = (star) => {
    setHoveredRating(star);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      const reviewData = {
        userId: parseInt(userId),
        itemId: parseInt(itemId),
        rating: parseInt(rating),
        content: content
      };
      console.log(reviewData);
      dispatch(createReview(reviewData));
      onClose();
    }
  };

  return (
    <div className="review-modal">
      <h2>Write a Review</h2>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={`star ${star <= (hoveredRating || rating) ? 'active' : ''}`} 
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}
          >
            ★
          </span>
        ))}
      </div>
      <textarea 
        className="review-content"
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Write your review here..."
      />
      <div className="button-container">
        <button 
          className={`submit-button ${isSubmitDisabled ? 'disabled' : ''}`} 
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Submit Review
        </button>
        {isSubmitDisabled && showTooltip && (
          <div className="tooltip">Both rating and text required to submit a review.</div>
        )}
        <button className="cancel-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateReviewModal;
