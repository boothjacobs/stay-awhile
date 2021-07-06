import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { editCabin, getCabins, getRanch } from "../../../store/ranch-store";

const EditCabinModal = ({cabin}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState(cabin.name);
    const [beds, setBeds] = useState(cabin.beds);
    const [total_capacity, setCapacity] = useState(cabin.total_capacity);
    const [image, setImage] = useState("");

    useEffect(() => {
        // console.log("Edit Ranch Modal dispatch of getRanch")
        showModal && dispatch(getRanch(cabin.ranch_id));
    }, [dispatch, cabin.ranch_id, showModal]);

    const getImage = (e) => {
        if (e.target.files) {
            const imgFile = e.target.files[0];
            setImage(imgFile);
        } else {
            console.log("no image")
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("beds", beds);
        formData.append("total_capacity", total_capacity);
        formData.append("image", image);

        dispatch(editCabin(cabin.id, formData));
        setShowModal(false);
    };

    return (
        <>
            <button type="button" onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <div className="form-box">
                        <h3 className="modal-head">Edit Cabin Details</h3>
                        <form className="modal-form" onSubmit={handleSubmit}>
                        <label>Cabin or Room Name
                            <input
                                type="text"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                ></input></label>
                        <label>How Many Beds?
                            <input
                                type="number"
                                name="beds"
                                onChange={(e) => setBeds(e.target.value)}
                                value={beds}
                            ></input></label>
                        <label>Sleeps How Many People?
                            <input
                                type="number"
                                name="total_capacity"
                                onChange={(e) => setCapacity(e.target.value)}
                                value={total_capacity}
                            ></input></label>
                        <label>{(cabin.img_url) ? ("Replace Photo--leave blank to keep current file") : ("Add Photo")}
                            <input
                                type="file"
                                name="image"
                                onChange={getImage}
                                // value={image}
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

export default EditCabinModal;
