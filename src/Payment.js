import React from 'react';

const Payment = ({subtotalPrice, totalPrice}) => {
    return (
        <div className="payment">
            <h3 className="payment__header">
                Payment details
            </h3>
            <div className="subtotal">
                <div className="subtotal__header">
                    Subtotal:
                </div>
                <div className="subtotal__price">
                    ${subtotalPrice.toFixed(2)}
                </div>
            </div>
            <div className="shipment">
                <div className="shipment__header">
                    Shipment cost
                </div>
                <div className="shipment__price">
                    $22.50
                </div>
            </div>
            <div className="total">
                <div className="total__header">
                    Grand Total
                </div>
                <div className="total__cost">
                    ${totalPrice.toFixed(2)}
                </div>
            </div>
            <a href="/" className="payment__button">
                Order
            </a>
        </div>
    )
}

export default Payment;