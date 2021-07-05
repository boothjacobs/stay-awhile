const SET_INVOICE = "invoice/SET_INVOICE";

const setInvoice = (invoice) => ({
    type: SET_INVOICE,
    payload: invoice
});

export const getInvoice = (bookingId) => async (dispatch) => {
    console.log("get invoice thunk", bookingId);
    const response = await fetch(`/api/booking/${bookingId}/invoice`);
    const data = await response.json();
    if (response.ok) {
        dispatch(setInvoice(data));
    };
    return data;
};

export const newInvoice = (bookingId, formData) => async (dispatch) => {
    console.log("new invoice thunk", bookingId)
    const response = await fetch()
    const data = await response.json(`/api/booking/${bookingId}/invoice`, {
        method: "POST",
        body: formData
    });
    if (response.ok) {
        dispatch(setInvoice(data));
    }
    return data;
};

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_INVOICE:
            return {...action.payload};
        default:
            return state;
    }
};
