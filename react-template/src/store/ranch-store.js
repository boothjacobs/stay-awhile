export const SET_RANCH = "ranch/SET_RANCH";

const setRanch = (ranch) => ({
    type: SET_RANCH,
    payload: ranch
});

export const getRanch = (ranchId) => async (dispatch) => {
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
    // console.log("editRanch RANCH DATA", ranchData)
    if (ranchData.errors) {
        console.log("editRanch thunk errors from ranch-store: ", ranchData);
        return;
    }
    dispatch(setRanch(ranchData));
    return ranchData;
};

export const addCabin = (ranchId, formData) => async (dispatch) => {
    const ranchResponse = await fetch(`/api/ranch/${ranchId}/cabins`, {
        method: "POST",
        body: formData,
    });
    const ranchData = await ranchResponse.json();
    // console.log("addCabin RANCH DATA", ranchData)
    if (ranchData.errors) {
        console.log("addCabin thunk errors from ranch-store: ", ranchData);
        return;
    }  // because of association, store can be updated with ranch info and that will render cabin changes
    dispatch(setRanch(ranchData));
    return ranchData;
};

export const deleteCabin = (cabinId) => async (dispatch) => {
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
    dispatch(setRanch(data));
    return data;
}

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_RANCH:
            return {ranch: action.payload}
        default:
            return state;
    }
};
