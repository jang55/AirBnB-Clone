import { useState } from "react";
import { Modal } from "../../context/Modal";
import AboutDev from "./AboutDev";


function AboutDevModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p className="about-me-open-button" onClick={() => setShowModal(true)} >About Dev</p>            
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <AboutDev setShowModal={setShowModal}/>
            </Modal>
            )}
        </>
    )
};


export default AboutDevModal;