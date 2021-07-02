import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCabin, getRanch, getCabins } from "../../../store/ranch-store";

const DeleteCabinModal = ({cabin}) => {
    const dispatch = useDispatch();
    const ranch = useSelector(state => state.ranch.ranch);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        console.log("delete cabin modal useEffect", ranch, cabin)
        showModal && dispatch(getCabins(ranch.id));
    }, [dispatch, ranch.id, showModal]);

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
                    <div className="confirm-modal-box">
                        <div className="modal-confirmation-msg">
                            <p>Are you sure you want to delete {cabin.name} from your records?</p>
                        </div>
                        <div className="modal-buttons">
                            <button type="button" onClick={deleteButton}>Confirm Delete</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default DeleteCabinModal;
