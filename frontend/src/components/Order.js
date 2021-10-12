import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrders, oneLess, oneMore, openHistory, ordered, removePrice } from '../actions';
import { createOrder } from '../apiService/orderApi';
import auth from "../apiService/auth-helper"
import { addressList, createAddress, removeAddress } from '../apiService/addressApi';

const Order = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.CartReducer)
    const orderPrice = useSelector(state => state.orderReducer.ordersPrice)
    const [multiplyPrice, setMultiplyPrice] = useState([])
    const [makeAddress, setMakeAddress] = useState(false)
    const [noOfAddress, setNoOfAddress] = useState(0)
    const [addresses, setAddresses] = useState([])
    const [popUp, setPopUp] = useState(false)

    const [values, setValues] = useState({
        address: "",
        floor: 1,
        error: ""
    })
    const addressDelete = (addressId) => {
        removeAddress(addressId).then(response => console.log(response)).catch(reason => console.log(reason))
        setNoOfAddress(noOfAddress - 1)
    }

    const onChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }
    useEffect(() => {
        const orderPriceCopy = orderPrice.slice();
        for (let i = 0; i < orderPrice.length; i++) {
            orderPriceCopy[i] = orderPrice[i] * orders.howMany[i]
        }
        setMultiplyPrice(orderPriceCopy)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        addressList(auth.isAuthenticated().user.name).then(response => setAddresses(response)).catch(reason => console.log(reason))
    }, [noOfAddress])

    const onOrderClick = () => {
        for (let i = 0; i < orders.dough.length; i++) {


            const order = {
                dough: orders.dough[i].name,
                ingredients: orders.ingredients[i],
                price: multiplyPrice[i],
                creator: auth.isAuthenticated().user.name,
                quantity: orders.howMany[i]
            }

            createOrder(order).then((response) => console.log(response)).catch((err) => console.log(err))
        }
        setPopUp(true)
    }

    const onNewOrder = () => {
        dispatch(ordered())
        dispatch(deleteOrders())
        dispatch(removePrice())
        setPopUp(false)
    }

    const onOpenHistory = () => {
        dispatch(openHistory())
        dispatch(ordered())
        dispatch(deleteOrders())
        dispatch(removePrice())
        setPopUp(false)
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

    const onNewClick = () => {
        setMakeAddress(true)
    }
    const cancel = () => {
        setMakeAddress(false)
        setValues({ address: "", floor: 1 })
    }

    const onAddClick = () => {
        let address = {
            creator: auth.isAuthenticated().user.name,
            address: values.address,
            floor: values.floor
        }
        createAddress(address).then((data) => {
            if (data.error) setValues({ ...values, error: data.error })
            else {
                setNoOfAddress(noOfAddress + 1)
                setMakeAddress(false)
                setValues({ address: "", floor: 1, error: "" })
            }
        })
    }

    console.log(addresses.length)
    return (
        <div className="orderWrapper">
            <div className="addressWrapper">
                <div className="addressHeader">
                    <h2>Address to deliver</h2>
                </div>
                <div className="addresses">
                    {addresses && (addresses.map((address, i) => (
                        <div className="address" key={i}>
                            <div className="displayFlex" style={{ alignItems: "flex-start", paddingBottom: "0px" }}><p>Address:</p>
                                <p id="address">{address.address}</p>
                            </div>
                            <div className="displayFlex" style={{ padding: "3px 0px" }}>
                                <p>Floor:</p>
                                <p style={{ width: "100%", fontWeight: "500" }}>{address.floor}</p>
                            </div>
                            <div className="displayFlex" style={{ padding: "3px 0px" }}>
                                <p>Chack:</p>
                                <input id="radio" defaultChecked={i === 0 ? true : false} type="radio" style={{ marginLeft: "1px" }} name="address" value={address.address} />
                            </div>
                            <div className="delete address" onClick={() => addressDelete(address._id)}><p>x</p></div>

                        </div>
                    )))}
                    <div className={!makeAddress ? "addressNew" : "addressForm"} >
                        {!makeAddress && (<div onClick={() => onNewClick()} style={{ height: "100%", display: "flex", justifyContent: "center", textAlign: "center" }}><h1>Add new</h1>
                            <div className="addresOverlay" ><h1>+</h1></div></div>)}

                        {makeAddress && (<div style={{ position: "relative", height: "100%" }}>
                            <div className="displayFlex"><p>Address:</p>
                                <input className={values.error ? "error" : ""} type="text" placeholder={values.error ? "Can't be empty" : "Add address"} onChange={onChange("address")} value={values.address} />
                            </div>
                            <div className="displayFlex">
                                <p>Floor:</p>
                                <input type="number" onChange={onChange("floor")} value={values.floor} />
                            </div>
                            <div className="addressButtons">
                                <button id="cancel" onClick={() => cancel()}>Cancel</button>
                                <button id="add" onClick={() => onAddClick()}>Add</button>
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>
            <div className="paymentWrapper">
                <div className="paymentHeader">
                    <h2 >Payment</h2>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <input id="radio" type="radio" defaultChecked style={{ marginLeft: "3em" }} />
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
                <div className="notes">
                    <p>Notes: </p>
                    <textarea placeholder="Any additional notes" rows="4" cols="50" name="comment" form="usrform" />
                </div>
                <div style={{ display: 'flex', justifyContent: "center", marginTop: "1em" }}>
                    <button className="orderButton" onClick={() => onOrderClick()}>Order</button>
                </div>
            </div>
            {popUp && (<div className="popUpIngredients">
                {addresses.length > 0 ? <div className="innerDiv finish">
                    <div>
                        <h2>Congratulation, you successfully made order</h2>
                    </div>
                    <div className="buttonsPopUp">
                        <button onClick={() => onNewOrder()}>
                            NEW ORDER
                        </button>
                        <button onClick={() => onOpenHistory()}>
                            ORDER HISTORY
                        </button>
                    </div>
                </div> :
                    <div className="innerDiv error">
                        <h2>Unfortunately, we couldnt make your order without your address.</h2>
                        <h2>Try again with address</h2>
                        <button id="closeBatton" onClick={() => setPopUp(false)}><span></span></button>
                    </div>}
            </div>)}
        </div>
    );
};

export default Order;