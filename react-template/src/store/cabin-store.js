const SET_CABINS = "ranch/SET_CABINS";
const ONE_CABIN = "ranch/ONE_CABIN";
const DELETE_CABIN = "ranch/DELETE_CABIN";


const setCabins = (cabins) => ({
    type: SET_CABINS,
    payload: cabins
});

const setOneCabin = (cabin) => ({
    type: ONE_CABIN,
    payload: cabin
})

const delCabin = (cabinId) => ({
    type: SET_CABINS,
    payload: cabinId
});


export const getCabins = (ranchId) => async (dispatch) => {
    // console.log("getCabins thunk", ranchId)
    const cabinsRes = await fetch(`/api/ranch/${ranchId}/cabins`);
    if (cabinsRes.errors) {
        console.log("getCabins thunk errors from ranch-store: ", cabinsRes);
        return;
    };
    const cabinData = await cabinsRes.json()
    dispatch(setCabins(cabinData));
    return cabinData;
}

export const addCabin = (ranchId, formData) => async (dispatch) => {
    const ranchResponse = await fetch(`/api/ranch/${ranchId}/cabins`, {
        method: "POST",
        body: formData,
    });
    const cabinData = await ranchResponse.json();
    if (cabinData.errors) {
        console.log("addCabin thunk errors from ranch-store: ", cabinData);
        return;
    };
    // because of association, store can be updated with ranch info and that will render cabin changes
    dispatch(setOneCabin(cabinData));
    return cabinData;
};

export const editCabin = (cabinId, formData) => async (dispatch) => {
    const cabinResponse = await fetch(`/api/ranch/cabins/${cabinId}`, {
        method: "PUT",
        body: formData,
    });
    const cabinData = await cabinResponse.json();
    if (cabinData.errors) {
        console.log("editCabin thunk errors from ranch-store: ", cabinData);
        return;
    }
    dispatch(setCabins(cabinData));
    return cabinData;
};

export const deleteCabin = (cabinId) => async (dispatch) => {
    // console.log("deleteCabin thunk", cabinId)
    const res = await fetch(`/api/ranch/cabins/${cabinId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (res.errors) {
        console.log("deleteCabin thunk errors from ranch-store: ", res);
        return;
    }
    const data = await res.json()
    dispatch(delCabin(data.deleted));
    return data;
};

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_CABINS:
            const cabinState = {...action.payload};
            // cabinState["cabins"] = action.payload;
            return cabinState;
        case ONE_CABIN:
            const addCabinState = {...state};
            addCabinState[action.payload.id] = action.payload;
            return addCabinState;
        case DELETE_CABIN:
            const lessCabinState = {...state};
            delete lessCabinState[action.payload];
            return lessCabinState;
        default:
            return state;
    }
};
