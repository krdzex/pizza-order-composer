import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { oneLess, oneMore, openPopUpSignin, order } from '../actions';
import auth from "../apiService/auth-helper"
const Cart = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.CartReducer)
    const [orderPrice, setOrderPrice] = useState([]);
    const [multiplyPrice, setMultiplyPrice] = useState([])
    useEffect(() => {
        let priceOfIngredients = 0
        if (orders.ingredients.length > 0) {
            for (let i = 0; i < orders.ingredients[orders.ingredients.length - 1].length; i++) {
                priceOfIngredients += orders.ingredients[orders.ingredients.length - 1][i].price
            }
            priceOfIngredients += orders.dough[orders.dough.length - 1].price
            setOrderPrice([...orderPrice, priceOfIngredients])
            setMultiplyPrice([...multiplyPrice, priceOfIngredients])
        }
        // eslint-disable-next-line
    }, [orders.ingredients])

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

    const onBuyClick = () => {
        if (auth.isAuthenticated()) {
            dispatch(order(orderPrice))
        } else {
            dispatch(openPopUpSignin())
        }
    }

    return (
        <div className="cartWrapper">
            {orders.ingredients.length > 0 ? <div style={{ height: "100%" }}>
                <div className="title">
                    <h2>Orders</h2>
                </div>
                <div className="cartContent">
                    {orders && orders.dough.map((order, id) => (
                        <div className="order" key={id}>
                            <div className="orderHeader">
                                <h2>{order.name}</h2>
                                <div className="orderRightSide">
                                    <p>{multiplyPrice[id]}$</p>
                                    <div style={{ border: "1px solid black", display: 'flex' }}>
                                        <button id="minus" onClick={() => onMinusClick(id)} disabled={orders.howMany[id] <= 1} style={orders.howMany[id] <= 1 ? { opacity: "0.5" } : { opacity: "1" }}>-</button>
                                        <div style={{ width: "30px", height: "30px", display: 'flex', justifyContent: "center", alignItems: "center", borderRight: "1px solid black", borderLeft: "1px solid black" }}>{orders.howMany[id]}</div>
                                        <button id="plus" onClick={() => onPlusClick(id)}>+</button>
                                    </div>

                                </div>
                            </div>
                            <div className="orderIngredients">
                                {orders.ingredients[id] !== undefined && orders.ingredients[id].map((ingredient, index) => {
                                    return <div className="orderIngredient" key={index}>{ingredient.name}{index !== orders.ingredients[id].length - 1 ? "," : ""}</div>
                                })}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p>Delivery</p>
                    <p>5$</p>

                </div>

                <div className="cartFooter">
                    <div className="footerMoney">
                        <h2>Total</h2>
                        <p>{multiplyPrice.reduce((a, b) => a + b, 5)}$</p>
                    </div>
                    <button onClick={() => onBuyClick()}>BUY</button>
                </div>
            </div> : <div className="emptyCart"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg></div>}
        </div>
    );
};

export default Cart;