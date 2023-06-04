import { useDispatch } from "react-redux";
import * as spotActions from "../../store/spotsReducer";
import "../Reviews/DeleteModal.css"


function DeleteLocation({setShowModal, locationId}) {
    const dispatch = useDispatch();
    

    const confirmButtonHandler = async(e) => {
        e.preventDefault();
        await dispatch(spotActions.deleteSpotThunk(locationId));
    };

    return(
        <div className="delete-container">
            <h1>Confirm Delete</h1>
            <h5>Are you sure you want to remove this spot from the listings?</h5>
            <button className="delete-confirm-button" onClick={confirmButtonHandler}>Yes (Delete Spot)</button>
            <button className="delete-deny-button" onClick={() => setShowModal(false)}>No (Keep Spot)</button>
        </div>
    )
};

export default DeleteLocation;