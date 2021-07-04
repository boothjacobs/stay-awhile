const SET_BOOKING = "booking/SET_BOOKING";
const ALL_BOOKINGS = "booking/ALL_BOOKINGS";
const DELETE_BOOKING = "booking/DELETE_BOOKINGS";

const thisBooking = (booking) => ({
    type: SET_BOOKING,
    payload: booking
});

const allBookings = (bookings) => ({
    type: ALL_BOOKINGS,
    payload: bookings
});

const delBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    payload: bookingId
});

export const addBooking = (formData) => async (dispatch) => {
    const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formData
    });
    const bookData = await res.json();
    if (res.ok) {
        dispatch(thisBooking(bookData));
    }
    return bookData;
};

export const getBookings = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/bookings`);
    const bookData = await res.json();
    console.log("getBookings thunk", bookData);
    if (res.ok) {
        dispatch(allBookings(bookData));
    }
    return bookData;
};

export const editBooking = (formData) => async (dispatch) => {
    const id = formData.bookingId;
    const res = await fetch(`/api/booking/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: formData
    });
    const bookData = await res.json();
    if (res.ok) {
        dispatch(thisBooking(bookData));
    }
    return bookData;
};

export const deleteBooking = (id) => async (dispatch) => {
    const res = await fetch(`/api/booking/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    console.log("delete booking thunk: data", data)
    if (res.ok) {
        dispatch(delBooking(data.deleted));
    }
    return data;
}

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_BOOKING:
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case ALL_BOOKINGS:
            return {...action.payload};
        case DELETE_BOOKING:
            const lessState = {...state};
            delete lessState[action.payload];
            return lessState;
        default:
            return state;
    }
};
