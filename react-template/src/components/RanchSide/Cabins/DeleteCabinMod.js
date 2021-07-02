import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteCabin, getRanch } from "../../../store/ranch-store";

const DeleteCabinModal = ({cabin}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getRanch(cabin?.ranch_id));
        setShowModal(false);
    }, [dispatch, cabin?.ranch_id]);

    const deleteButton = (e) => {
        dispatch(deleteCabin(cabin?.id));
        console.log("deleted")
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
