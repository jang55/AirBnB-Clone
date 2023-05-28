import React, { useState } from "react";

function OpenModalButton({
  buttonText,
  modalComponent,
  closeMenu
}) {
  
  const [showModal, setShowModal] = useState(false);

  const ModalWithProp = React.cloneElement(modalComponent, { setShowModal });

  const onClickHandler = (e) => {
    setShowModal(!showModal);
  };

  return (
    <>
      <button className="modal-item" onClick={onClickHandler}>
        {buttonText}
      </button>
      {showModal && ModalWithProp}
    </>
  );
}

export default OpenModalButton;