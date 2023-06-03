import { csrfFetch } from "./csrf";

/*************** TYPES **************************/
const LOAD_REVIEWS = "reviews/loadReviews";
// const ADD_REVIEW = "reviews/addReview";
const UPDATE_REVIEW = "reviews/updateReview";
const REMOVE_REVIEW = "reviews/removeReview";

/*************** ACTIONS CREATOR **************************/
export const loadReviewsAction = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    payload: reviews,
  };
};

/******/

// export const addOneReviewAction = (review) => {
//   return {
//     type: ADD_REVIEW,
//     payload: review,
//   };
// };

/******/

export const updateOneReviewAction = (review) => {
  return {
    type: UPDATE_REVIEW,
    payload: review,
  };
};

/******/

export const removeReviewAction = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    payload: reviewId,
  };
};

/*************** THUNK ACTIONS CREATOR **************************/

//loads all review by spot id
export const loadReviewsThunk = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/locations/${spotId}/reviews`);

  if (res.ok) {
    const reviews = await res.json();
    dispatch(loadReviewsAction(reviews));
    return reviews;
  }
};

/******/

//creates a review for spot by id
export const addReviewThunk = (review, spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/locations/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    await dispatch(loadReviewsThunk(spotId));
  }
};

/******/

//updates an existing review
export const updateReviewThunk =
  (updatedReview, reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedReview),
    });

    if (res.ok) {
      const review = await res.json();
      dispatch(updateOneReviewAction(review));
      return review;
    }
  };

/******/

//deletes a review
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(removeReviewAction(reviewId));
  }
};

/************* REDUCER **********************/
const initialState = {};

const reviewReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD_REVIEWS:
      newState = {};
      const allReviews = action.payload.Reviews;
      allReviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;
    // case ADD_REVIEW:
    //   newState = { ...state };
    //   newState[action.payload.id] = action.payload;
    //   return newState;
    case UPDATE_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_REVIEW:
      newState = { ...state };
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;

// window.store.dispatch(window.reviewActions.loadReviewsThunk(1));
// window.store.dispatch(window.reviewActions.addReviewThunk({
//   "review": "This was an awesome spot!",
//   "stars": 5,
// } ,1));
// window.store.dispatch(window.reviewActions.updateReviewThunk({
//   "review": "Love It",
//   "stars": 4,
// } ,1));
