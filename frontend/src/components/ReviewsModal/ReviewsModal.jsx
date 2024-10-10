import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { editReview, deleteReview } from "../../store/review";
import { selectReviewsByItemId } from "../../store/selectors";
import "./ReviewsModal.css";

const ReviewsModal = ({ item }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => selectReviewsByItemId(state, item.id));
  const [editingReview, setEditingReview] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const sortedReviews = useMemo(() => {
    return [...reviews].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [reviews]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "N/A";

  const handleEdit = (review) => {
    setEditingReview(review.id);
    setEditedContent(review.content);
  };

  const handleSave = (review) => {
    dispatch(
      editReview({
        reviewId: review.id,
        reviewData: { ...review, content: editedContent },
      })
    );
    setEditingReview(null);
  };

  const handleDelete = (reviewId, itemId) => {
    dispatch(deleteReview({ reviewId, itemId }));
  };

  return (
    <div className="reviews-modal">
      <h2>{item.name}</h2>
      <h4>
        Average rating:{" "}
        <span className="average-rating">
          {averageRating}{" "}
          <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
        </span>
      </h4>
      <div className="reviews-container">
        {sortedReviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-header">
              <span className="silver">
                {review.rating}{" "}
                <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
              </span>
              <span className="silver">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            {editingReview === review.id ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <p>{review.content}</p>
            )}
            {loggedInUser && loggedInUser.id === review.userId && (
              <div className="review-actions">
                {editingReview === review.id ? (
                  <button onClick={() => handleSave(review)} className="save">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(review)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                )}
                <button onClick={() => handleDelete(review.id, item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsModal;
