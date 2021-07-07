// refactored PayPal button code from https://developer.paypal.com/demo/checkout/#/pattern/server

// Call your server to set up the transaction
export const createOrder = (data, actions) => async (dispatch) => {
    const res = await fetch('/demo/checkout/api/paypal/order/create/', {
        method: 'post'
    });
    const orderData = await res.json();
    return orderData.id;
};


// Call your server to finalize the transaction
export const onApprove = (data, actions) => async(dispatch) => {
    const res = await fetch('/demo/checkout/api/paypal/order/' + data.orderID + '/capture/', {
        method: 'post'
    });
    const orderData = await res.json();
    // Three cases to handle:
    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
    //   (2) Other non-recoverable errors -> Show a failure message
    //   (3) Successful transaction -> Show confirmation or thank you

    // This example reads a v2/checkout/orders capture response, propagated from the server
    // You could use a different API or structure for your 'orderData'
    const errorDetail = Array.isArray(orderData.details) && orderData.details[0];

    if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
        return actions.restart(); // Recoverable state, per:
        // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
    }

    if (errorDetail) {
        var msg = 'Sorry, your transaction could not be processed.';
        if (errorDetail.description) msg += '\n\n' + errorDetail.description;
        if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
        return alert(msg); // Show a failure message
    }

    // Show a success message
    alert('Transaction completed by ' + orderData.payer.name.given_name);
};
