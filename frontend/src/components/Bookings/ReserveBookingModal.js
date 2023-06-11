import { useState } from "react";
import { Modal } from "../../context/Modal";
import ReserveBooking from "./ReserveBooking";


function ReserveBookingModal({spot}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button id="reserve-button" onClick={() => setShowModal(true)} >Reserve</button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <ReserveBooking spot={spot}/>
            </Modal>
          )}
        </>
    )
};


export default ReserveBookingModal;