import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addCabin, getRanch } from "../../../store/ranch-store";
import DeleteCabinModal from "./DeleteCabinMod";

const AddCabin = () => {
    const dispatch = useDispatch();
    const ranch = useSelector(state => state.ranch.ranch);
    let cabins;
    if (ranch) {
        cabins = Object.values(ranch?.cabins);
    };

    // useEffect(() => {
    //     dispatch(getRanch(ranch?.id));
    // }, [dispatch, ranch?.id]);
    //need this to prevent console errors for api call to ranch/undefined,
    //but where to get stable ranch id from? add to URL?

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

    const editButton = (e) => {
        console.log(e.target.id)
    }

    return (
        <>
            <div className="form-box">
                <h3>New Lodging</h3>
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
                <ul>
                    {cabins?.map((cabin) => {
                        // console.log("map", cabin);
                        return ( <li key={cabin.id}>{cabin.name}
                            <ul id="cabin-deets">
                                <li>Beds: {cabin.beds}</li>
                                <li>Capacity: {cabin.total_capacity}</li>
                                <li><img className="cabin-thumbnail" src={`${cabin.img_url}`} alt={cabin.name}/></li>
                                <li><button type="button" id={cabin.id} onClick={editButton}>Edit</button></li>
                                <li><DeleteCabinModal /></li>
                            </ul>
                        </li> )
                    })}
                </ul>
            </div>
        </>
    )
}

export default AddCabin;
