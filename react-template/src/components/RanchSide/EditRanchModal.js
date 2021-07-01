import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editRanch, getRanch } from "../../store/ranch-store";

const EditRanchModal = ({ranch}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const [ranch_name, setRanchName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [nightly_rate, setRate] = useState("");

    useEffect(() => {
        dispatch(getRanch(ranch.id));
        setShowModal(false);
    }, [dispatch])

    const handleSubmit = (e) => {
        // e.preventDefault(); //should be unnecessary
        const formData = new FormData();
        formData.append("ranch_name", ranch_name);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("nightly_rate", nightly_rate);

        dispatch(editRanch(ranch.id, formData));
        setShowModal(false);
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Edit Ranch Details</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="form-box">
                        <h3 className="modal-head">Edit Ranch Details</h3>
                        <form className="modal-form" onSubmit={handleSubmit}>
                        <label>Ranch Name
                            <input
                            type="text"
                            name="ranch_name"
                            onChange={(e) => setRanchName(e.target.value)}
                            value={ranch_name}
                            ></input></label>
                        <label>Ranch Location
                            <input
                            type="text"
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            ></input></label>
                        <label>Description
                            <input
                            type="text"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            ></input></label>
                        <label>Base Nightly Rate
                            <input
                            type="number"
                            name="nightly_rate"
                            onChange={(e) => setRate(e.target.value)}
                            value={nightly_rate}
                            ></input></label>
                            <div className="modal-buttons">
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            )}
        </>
    )

}

export default EditRanchModal;
