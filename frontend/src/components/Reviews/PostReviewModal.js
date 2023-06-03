import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import PostReview from "./PostReview";

function PostReviewModal({ locationId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="post-review-button" onClick={() => setShowModal(true)}>
        Post Your Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostReview locationId={locationId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
export default PostReviewModal;
