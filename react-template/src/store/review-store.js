const ALL_REVIEWS = "booking/ALL_REVIEWS";
const SET_REVIEW = "booking/SET_REVIEW";
const DELETE_REVIEW = "booking/DELETE_REVIEW";

const get = (reviews) => ({
    type: ALL_REVIEWS,
    payload: reviews
});

const setReview = (review) => ({
    type: SET_REVIEW,
    payload: review
});

const delReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId
});

export const getReviews = (ranchId) => async (dispatch) => {
    const res = await fetch(`/api/ranch/${ranchId}/review`);
    const reviewData = await res.json();
    if (res.ok) {
        dispatch(get(reviewData));
    }
    return reviewData;
};

export const addReview = (formData, bookId) => async (dispatch) => {
    const res = await fetch(`/api/booking/${bookId}/review`, {
        method: "POST",
        body: formData
    });
    const reviewData = await res.json();
    if (res.ok) {
        dispatch(setReview(reviewData));
    }
    return reviewData;
};

export const editReview = (formData, bookId, id) => async (dispatch) => {
    const res = await fetch(`/api/booking/${bookId}/review/${id}`, {
        method: "PUT",
        body: formData
    });
    const reviewData = await res.json();
    if (res.ok) {
        dispatch(setReview(reviewData));
    }
    return reviewData;
};

export const deleteReview = (bookId, id) => async (dispatch) => {
    const res = await fetch(`/api/booking/${bookId}/review/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    // console.log("delete review thunk: data", data)
    if (res.ok) {
        dispatch(delReview(data.deleted));
    }
    return data;
};

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case ALL_REVIEWS:
            return {...action.payload};
        case SET_REVIEW:
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_REVIEW:
            const lessState = {...state};
            delete lessState[action.payload];
            return lessState;
        default:
            return state;
    }
};
