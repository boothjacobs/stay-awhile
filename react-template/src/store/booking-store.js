const SET_BOOKING = "booking/SET_BOOKING";

const thisBooking = (booking) => ({
    type: SET_BOOKING,
    payload: booking
});

export const addBooking = (formData) => async (dispatch) => {
    const res = await fetch("/api/booking", {
        method: "POST",
        body: formData
    });
    const bookData = await res.json();
    if (res.ok) {
        dispatch(thisBooking(bookData));
    }
    return bookData;
};

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_BOOKING:
            return {booking: action.payload};
        default:
            return state;
    }
};
