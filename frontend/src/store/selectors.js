import { createSelector } from "@reduxjs/toolkit";

export const selectReviewsByItemId = createSelector(
  [(state) => state.review.reviews, (state, itemId) => itemId],
  (reviews, itemId) => reviews[itemId] || []
);
