import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrders, oneLess, oneMore, ordered } from '../actions';
import { createOrder } from '../apiService/orderApi';
import auth from "../apiService/auth-helper"

const Order = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.CartReducer)
    const orderPrice = useSelector(state => state.orderReducer.ordersPrice)
    const [multiplyPrice, setMultiplyPrice] = useState([])

    useEffect(() => {

        const orderPriceCopy = orderPrice.slice();
        for (let i = 0; i < orderPrice.length; i++) {
            orderPriceCopy[i] = orderPrice[i] * orders.howMany[i]
        }
        console.log(orderPriceCopy)
        setMultiplyPrice(orderPriceCopy)
        // eslint-disable-next-line
    }, [])

    const onOrderClick = () => {
        for (let i = 0; i < orders.dough.length; i++) {


            const order = {
                dough: orders.dough[i].name,
                ingredients: orders.ingredients[i],
                price: multiplyPrice[i],
                creator: auth.isAuthenticated().user.name,
                quantity:orders.howMany[i]
            }
            
            createOrder(order).then((response) => console.log(response)).catch((err) => console.log(err))
        }
        dispatch(ordered())
        dispatch(deleteOrders())
    }

    const onPlusClick = (id) => {
        dispatch(oneMore(id));
        let newMultiplyPrice = orderPrice.map((order, idx) => (
            id === idx ? order *= (orders.howMany[id] + 1) : multiplyPrice[idx]
        ))
        setMultiplyPrice(newMultiplyPrice)
    }

    const onMinusClick = (id) => {
        dispatch(oneLess(id));
        let newMultiplyPrice = orderPrice.map((order, idx) => (
            id === idx ? order *= (orders.howMany[id] - 1) : multiplyPrice[idx]
        ))
        setMultiplyPrice(newMultiplyPrice)
    }


    return (
        <div className="orderWrapper">
            <div className="addressWrapper">
                <div className="addressHeader">
                    <h2>Address to deliver</h2>
                </div>
                <div className="addresses">

                    <div className="address">

                    </div>
                    <div className="address">

                    </div>
                    <div className="address">

                    </div>
                    <div className="address">

                    </div>
                    <div className="address">

                    </div>
                    <div className="address">

                    </div>
                </div>
            </div>
            <div className="paymentWrapper">
                <div className="paymentHeader">
                    <h2 >Payment</h2>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <input type="radio" defaultChecked style={{ marginLeft: "3em" }} />
                        <label>upon delivery</label>
                    </div>
                </div>
                <h3>Order</h3>
                {orders && orders.dough.map((order, id) => (
                    <div key={id} className="orders">
                        <h2>{order.name}</h2>
                        <p>{multiplyPrice[id]}$</p>
                        <div style={{ border: "1px solid black", display: 'flex' }}>
                            <button id="minus" onClick={() => onMinusClick(id)} style={orders.howMany[id] <= 1 ? { opacity: "0.5" } : { opacity: "1" }} disabled={orders.howMany[id] <= 1}>-</button>
                            <div style={{ width: "30px", height: "30px", display: 'flex', justifyContent: "center", alignItems: "center", borderRight: "1px solid black", borderLeft: "1px solid black" }}>{orders.howMany[id]}</div>
                            <button id="plus" onClick={() => onPlusClick(id)}>+</button>
                        </div>
                    </div>
                ))}
                <div style={{ borderBottom: "1px solid black", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3>Delivery</h3>
                    <p>5$</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h3>Total</h3>
                    <p>{multiplyPrice.reduce((a, b) => a + b, 5)}$</p>
                </div>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <button className="orderButton" onClick={() => onOrderClick()}>Order</button>
                </div>
            </div>

        </div>
    );
};

export default Order;