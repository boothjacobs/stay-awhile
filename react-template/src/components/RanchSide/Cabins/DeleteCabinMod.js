import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCabin, getRanch, getCabins } from "../../../store/ranch-store";

const DeleteCabinModal = ({cabin}) => {
    const dispatch = useDispatch();
    const ranch = useSelector(state => state.ranch.ranch);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        showModal && dispatch(getRanch(cabin?.ranch_id));
    }, [dispatch, cabin?.ranch_id, showModal]);

    const deleteButton = (e) => {
        dispatch(deleteCabin(cabin.id));
        setShowModal(false);
        console.log("delete TEST MODE delete button", cabin);
        dispatch(getCabins(ranch?.id))
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
