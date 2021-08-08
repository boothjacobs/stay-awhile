import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getAllInvoices} from '../../../store/invoice-store';

import "../ranchSide.css";

const AllInvoices = () => {
    const dispatch = useDispatch();
    const {id} = useParams(); //ranch ID

    useEffect(() => {
        dispatch(getAllInvoices(id))
    }, [dispatch, id]);

    const invoices = useSelector(state => state.invoice.invoices);

    return (
        <div id="all-invoices-js">
            <div className="under-nav">
            <h1>All Invoices</h1>
            <div className="invoice-list">
                {invoices?.map((invoice) =>
                    <div className="existing-invoice-render">
                        <h4>Invoice No. {invoice?.id}</h4>
                        <p>Any additional charges: {invoice?.additional_charges}</p>
                        <div className="invoice-boolean">
                            Deposit: {invoice?.deposit ? (<p>Paid</p>) : (<p>Unpaid</p>)}
                        </div>
                        <div className="invoice-boolean">
                            Rollover Payment: {invoice?.rollover_payment ? (<p>Applied</p>) : (<p>None</p>)}
                        </div>
                        <p>Subtotal: {invoice?.total}</p>
                        <p>Amount Paid: {invoice?.amount_paid}</p>
                        <p>Amount Due: {invoice?.amount_due}</p>
                    </div>
                        )
                    }
                    </div>
            </div>
        </div>
    )
};

export default AllInvoices;
