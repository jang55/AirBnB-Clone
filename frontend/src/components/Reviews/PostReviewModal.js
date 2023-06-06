import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import PostReview from "./PostReview";
import { useSelector } from "react-redux";

function PostReviewModal({ locationId }) {
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState(null);

  const user = useSelector((state) => state.sessionState.user);
  const allReviewsState = Object.values(useSelector(state => state.reviewState))

  useEffect(() => {
    if(user) {
      const reviewState = allReviewsState.find(review => review.userId === user.id);
      setReview(reviewState);
    }
  }, [allReviewsState, user]);

  return (
    <>
      {user && !review && (
        <div>
          <button
            className="post-review-button"
            onClick={() => setShowModal(true)}
          >
            Post Your Review
          </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <PostReview locationId={locationId} setShowModal={setShowModal} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}
export default PostReviewModal;
