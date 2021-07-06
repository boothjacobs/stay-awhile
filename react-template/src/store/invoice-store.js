const SET_INVOICE = "invoice/SET_INVOICE";
const OPEN_INVOICES = "invoice/OPEN_INVOICES";

const setInvoice = (invoice) => ({
    type: SET_INVOICE,
    payload: invoice
});

const openInvoices = (invoices) => ({
    type: OPEN_INVOICES,
    payload: invoices
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
    const invoices = await fetch(`/api/ranch/${ranchId}/invoices`);
    const invoiceData = await invoices.json();
    if (invoices.ok) {
        dispatch(openInvoices(invoiceData));
    }
    return invoiceData;
}

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

const initialState = {};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_INVOICE:
            return {...action.payload};
        default:
            return state;
    }
};
