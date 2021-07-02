export const SET_RANCH = "ranch/SET_RANCH";
const SET_CABINS = "ranch/SET_CABINS";

const setRanch = (ranch) => ({
    type: SET_RANCH,
    payload: ranch
});

const setCabins = (cabins) => ({
    type: SET_CABINS,
    payload: cabins
});

export const getRanch = (ranchId) => async (dispatch) => {
    console.log("getRanch thunk", ranchId)
    const response = await fetch(`/api/ranch/${ranchId}`);
    if (response.ok) {
        const ranch = await response.json()
        dispatch(setRanch(ranch))
    }
};

export const editRanch = (ranchId, formData) => async (dispatch) => {
    const ranchResponse = await fetch(`/api/ranch/${ranchId}`, {
        method: "PUT",
        //KeyError means get rid of fetch headers I guess????
        body: formData,
    });
    const ranchData = await ranchResponse.json();
    if (ranchData.errors) {
        console.log("editRanch thunk errors from ranch-store: ", ranchData);
        return;
    }
    dispatch(setRanch(ranchData));
    return ranchData;
};

export const getCabins = (ranchId) => async (dispatch) => {
    console.log("getCabins thunk", ranchId)
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
    const ranchData = await ranchResponse.json();
    if (ranchData.errors) {
        console.log("addCabin thunk errors from ranch-store: ", ranchData);
        return;
    };
    // because of association, store can be updated with ranch info and that will render cabin changes
    dispatch(setRanch(ranchData));
    return ranchData;
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
    console.log("deleteCabin thunk", cabinId)
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
    return data;
};

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_RANCH:
            return {ranch: action.payload}
        case SET_CABINS:
            const cabinState = {...state};
            console.log(cabinState, "and payload", action.payload)
            cabinState["cabins"] = action.payload;
            return cabinState;
        default:
            return state;
    }
};
