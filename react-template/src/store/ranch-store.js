export const SET_RANCH = "ranch/SET_RANCH";

const setRanch = (ranch) => ({
    type: SET_RANCH,
    payload: ranch
});


const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_RANCH:
            return {ranch: action.payload}
        default:
            return state;
    }
}
