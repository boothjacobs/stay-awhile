import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { editRanch, getRanch } from "../../store/ranch-store";

const EditRanchModal = ({ranch}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        showModal && dispatch(getRanch(ranch?.id));
    }, [dispatch, ranch?.id, showModal])

    const [ranch_name, setRanchName] = useState(ranch.ranch_name);
    const [location, setLocation] = useState(ranch.location);
    const [description, setDescription] = useState(ranch.description);
    const [nightly_rate, setRate] = useState(ranch.nightly_rate);
    const [image, setImage] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = (e) => {
        // e.preventDefault(); //should be unnecessary
        setImageLoading(true);

        const formData = new FormData();
        formData.append("ranch_name", ranch_name);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("nightly_rate", nightly_rate);
        formData.append("image", image)

        dispatch(editRanch(ranch.id, formData));
        setImageLoading(false);
        setShowModal(false);
    };

    const getImage = (e) => {
        if (e.target.files) {
            const imgFile = e.target.files[0];
            setImage(imgFile);
        } else {
            console.log("no image")
        }
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
                        <label>Optional Ranch Profile Image
                            <input
                            type="file"
                            name="image"
                            onChange={getImage}
                            />
                            {(imageLoading)&& <p>Uploading file...</p>}
                            </label>
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
