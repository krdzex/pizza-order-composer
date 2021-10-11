import React, { useEffect, useState } from 'react';
import auth from "../apiService/auth-helper"
import { orderHistoryList } from '../apiService/orderApi';

const OrderHistory = () => {


    useEffect(() => {
        orderHistoryList(auth.isAuthenticated().user.name).then(response => setOrderHistory(response)).catch(err => console.log(err))
    }, [])


    const [orderHistory, setOrderHistory] = useState([]);


    return (
        <div className="orderHistoryWrapper">
            <div className="orderHistoryHeader">
                <h2>Order history</h2>
            </div>
            {orderHistory.map((order, id) => (

                <div className="singleOrder" key={id}>
                    <div className="topSide">
                        <h3>

                            {order.dough}{order.quantity > 1 ? " x " + order.quantity : ""}
                        </h3>
                        <div className="price">
                            {order.price}$
                        </div>
                    </div>
                    <div className="buttomSide">
                        <div style={{ display: "flex" }}>
                            {order.ingredients.map((ingredient, id) => {
                                return (<div key={id} style={{ display: "contents" }}>{ingredient.name}{id !== order.ingredients.length - 1 ? ", " : ""}</div>)
                            })}
                        </div>
                        <div>
                            {order.created}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;