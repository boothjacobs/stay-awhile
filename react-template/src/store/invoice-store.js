const SET_INVOICE = "invoice/SET_INVOICE";
const OPEN_INVOICES = "invoice/OPEN_INVOICES";
const DELETE_INVOICE = "invoice/DELETE_INVOICE";

const setInvoice = (invoice) => ({
    type: SET_INVOICE,
    payload: invoice
});

const openInvoices = (invoices) => ({
    type: OPEN_INVOICES,
    payload: invoices
});

const delInvoice = (id) => ({
    type: DELETE_INVOICE,
    payload: id
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

export const getOpenInvoices = (ranchId) => async (dispatch) => {
    console.log("open invoices thunk", ranchId)
    const res = await fetch(`/api/ranch/${ranchId}/invoices`);
    const invoiceData = await res.json();
    if (res.ok) {
        dispatch(openInvoices(invoiceData));
    }
    return invoiceData;
};

export const newInvoice = (bookingId, formData) => async (dispatch) => {
    console.log("new invoice thunk", bookingId)
    const response = await fetch(`/api/booking/${bookingId}/invoice`, {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(setInvoice(data));
    }
    return data;
};

export const editInvoice = (bookId, formData) => async (dispatch) => {
    console.log("edit invoice thunk", bookId)
    const res = await fetch(`/api/booking/${bookId}/invoice`, {
        method: "PUT",
        body: formData
    });
    const invData = await res.json();
    if (res.ok) {
        dispatch(setInvoice(invData));
    }
    return invData;
};

export const deleteInvoice = (bookId) => async (dispatch) => {
    const res = await fetch(`/api/booking/${bookId}/invoice`, {
        method: "DELETE"
    });
    const data = await res.json();
    console.log("delete invoice thunk: data", data)
    if (res.ok) {
        dispatch(delInvoice(data.deleted));
    }
    return data;
};

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_INVOICE:
            return {...action.payload};
        case DELETE_INVOICE:
            const newState = {...state};
            delete newState[action.payload];
            return newState;
        case OPEN_INVOICES:
            return {...action.payload};
        default:
            return state;
    }
};
