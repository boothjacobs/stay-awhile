import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteCabin, getRanch } from "../../../store/ranch-store";

const DeleteCabinModal = ({cabin}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        console.log("delete cabin modal dispatch of getRanch")
        console.log("delete cabin modal", cabin)
        showModal && dispatch(getRanch(cabin?.ranch_id));
    }, [dispatch, cabin?.ranch_id, showModal]);

    const deleteButton = (e) => {
        dispatch(deleteCabin(cabin?.ranch_id, cabin?.id));
        setShowModal(false);
        console.log("delete TEST MODE")
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="modal-confirmation-msg">
                        <p>Are you sure you want to delete this lodging from your records?</p>
                    </div>
                    <div className="buttons">
                        <button type="button" onClick={deleteButton}>Confirm Delete</button>
                        <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default DeleteCabinModal;
