import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeHistory, openHistory, openPopUpSignin,ordered } from '../actions';
import auth from "../apiService/auth-helper"
import avatarPhoto from "../images/avatar.png"

const Header = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.CartReducer)
    const history = useSelector(state => state.orderHistory)
    const orderedState = useSelector(state => state.orderReducer)

    const onHistoryClick = (e) => {
        e.preventDefault();
        dispatch(openHistory())
    }

    const onTitleClick = () =>{
        if(history.open === true){
            dispatch(closeHistory())
        }
        if(orderedState.isOrdered === true){
            dispatch(ordered())
        }
    }

    return (
        <div className="headerWrapper">

            <div className="leftSide" onClick={() =>onTitleClick()}>
                <h2>Pizza order composer</h2>
            </div>

            <div className="rightSide">
                <div className="icon">
                    {orders.ingredients.length > 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>}
                </div>
                {
                    !auth.isAuthenticated() && (
                        <div>
                            <button className="signIn" onClick={() => dispatch(openPopUpSignin())}>Sign In</button>
                        </div>
                    )
                }
                {
                    auth.isAuthenticated() && (
                        <div>

                            <div className="avatar" tabIndex="0">
                                <img src={avatarPhoto} alt="avatar" style={{ width: "90%" }}></img>
                            </div>
                            <div className="nav-content">
                                <div className="nav-sub">
                                    <ul>
                                        <li><a href="/" onClick={onHistoryClick}>Order History</a></li>
                                        <li><a href="/" onClick={() => { auth.logout(window.location.reload()) }}>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>

        </div>
    );
};

export default Header;