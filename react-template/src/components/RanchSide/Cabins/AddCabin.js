import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addCabin, getCabins } from "../../../store/cabin-store";
import { getRanch } from "../../../store/ranch-store";
import DeleteCabinModal from "./DeleteCabinMod";
import EditCabinModal from "./EditCabinModal";

const AddCabin = () => {
    const dispatch = useDispatch();
    const ranch = useSelector(state => state.ranch);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        setImageLoading(false);
        dispatch(getRanch(user.ranch_id));
        dispatch(getCabins(user.ranch_id));
    }, [dispatch, user]);

    const cabins = Object.values(useSelector(state => state.cabin));
    // console.log("use selecotr cabins", cabins)

    const [name, setName] = useState("");
    const [beds, setBeds] = useState("");
    const [total_capacity, setCapacity] = useState("");
    const [image, setImage] = useState("");
    const [imageLoading, setImageLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("beds", beds);
        formData.append("total_capacity", total_capacity);
        formData.append("image", image);

        setImageLoading(true);
        dispatch(addCabin(ranch?.id, formData));

        setName("");
        setBeds("");
        setCapacity("");
        setImage("");
        setImageLoading(false);
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
        <div id="add-edit-cabin-js">
            <div className="cabin-form-box" id="add-cabin-form">
                <h3 className="auth-head">New Lodging</h3>
                <form className="cabin-form" onSubmit={submitHandler}>
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
                    <label>Optional Photo
                        <input
                            type="file"
                            name="image"
                            onChange={getImage}
                            // value={image}
                            ></input>
                    </label>
                    <button>Submit</button>
                    {(imageLoading)&& <p>Uploading file...</p>}
                </form>
            </div>
            <div className="all-cabin-view">
                <ul id="cabin-list">
                    {cabins?.map((cabin) => {
                        // console.log("map", cabin);
                        return (
                            <li key={cabin.id}><h2>{cabin.name}</h2>
                            <div className="cabin-entry">
                                    <div>Beds: {cabin.beds}</div>
                                    <div>Capacity: {cabin.total_capacity}</div>
                                    {cabin.img_url && <li><img className="cabin-thumbnail" src={`${cabin.img_url}`} alt={cabin.name}/></li>}
                                    {/* <li><button type="button" id={cabin.id} onClick={editButton}>Edit</button></li> */}
                                    <div>
                                        <EditCabinModal cabin={cabin} />
                                        <DeleteCabinModal cabin={cabin} />
                                    </div>
                            </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default AddCabin;
