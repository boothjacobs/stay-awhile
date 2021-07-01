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
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const ranchData = await ranchResponse.json();
    // console.log("RANCH DATA", ranchData)
    if (ranchData.errors) {
        console.log("SignUp thunk errors from ranch: ", ranchData);
        return;
    }

    dispatch(setRanch(ranchData));
    return ranchData;
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
