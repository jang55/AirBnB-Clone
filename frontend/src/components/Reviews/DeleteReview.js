import { useDispatch } from "react-redux";
import * as reviewActions from "../../store/reviewReducer";
import { useReview } from "../../context/ReviewContext";
import "./DeleteModal.css"

function DeleteReview({setShowModal, review}) {
    const dispatch = useDispatch();
    const {setDeleteReview} = useReview();

    const confirmButtonHandler = async(e) => {
        e.preventDefault();
       let result = await dispatch(reviewActions.deleteReviewThunk(review.id));
       if(result) setDeleteReview(true);
    };

    return(
        <div className="delete-container">
            <h1>Confirm Delete</h1>
            <h5>Are you sure you want to Delete this review?</h5>
            <button className="delete-confirm-button" onClick={confirmButtonHandler}>Yes (Delete Review)</button>
            <button className="delete-deny-button" onClick={() => setShowModal(false)}>No (Keep Review)</button>
        </div>
    )
}

export default DeleteReview;


