import React from 'react';
import '../css/orders.css';
import OrderList from "../components/OrderList";


export default function Order() {
    
    return (
        <>
            <div className="container-one">
                <div className="container-order">
                    <div className="title-order">
                        <h1>Cart</h1>
                    </div>
                    <OrderList/>
                </div>
            </div>
        </>
    )
}
