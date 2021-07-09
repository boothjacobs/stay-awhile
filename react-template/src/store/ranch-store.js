export const SET_RANCH = "ranch/SET_RANCH";
const FILTER_RANCHES = "ranch/FILTER_RANCHES";

const setRanch = (ranch) => ({
    type: SET_RANCH,
    payload: ranch
});

const filterRanches = (ranches) => ({
    type: FILTER_RANCHES,
    payload: ranches
});

export const getRanch = (ranchId) => async (dispatch) => {
    // console.log("getRanch thunk", ranchId);
    const response = await fetch(`/api/ranch/${ranchId}`);
    if (response.ok) {
        const ranch = await response.json()
        dispatch(setRanch(ranch));
    }
};

export const searchRanches = (searchTerm) => async (dispatch) => {
    // console.log("search or browse ranch thunk");
    const response = await fetch(`/api/ranch/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(searchTerm)
    });
    if (response.ok) {
        const ranches = await response.json();
        dispatch(filterRanches(ranches));
        return ranches;
    } else {
        console.log("errors in searchRanches thunk", response);
        return;
    }
}

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

const initialState = { };

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_RANCH:
            return {...action.payload};
        case FILTER_RANCHES:
            return {...action.payload};
        default:
            return state;
    }
};
