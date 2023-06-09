import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import PostReview from "./PostReview";
import { useSelector } from "react-redux";

function PostReviewModal({ locationId, location }) {
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState(null);
  const [spotOwner, setSpotOwner] = useState(false);

  const user = useSelector((state) => state.sessionState.user);
  const allReviewsState = Object.values(useSelector(state => state.reviewState))

  useEffect(() => {
    if(user) {
      const reviewState = allReviewsState.find(review => review.userId === user.id);
      setReview(reviewState);

      if(location.ownerId === user.id ){
        setSpotOwner(true);
      }
    }
  }, [allReviewsState, user, location.ownerId]);


  return (
    <>
      {user && !review && !spotOwner && (
        <div>
          <button
            className="post-review-button-open-modal"
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
