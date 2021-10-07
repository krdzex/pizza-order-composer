import React, { useState } from 'react';
import pizzaLogo from "../images/logo.png"
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { closePopUpSignup, openPopUpSignin } from '../actions';
import { create } from '../apiService/userApi';
const Signup = () => {
    const dispatch = useDispatch()
    const onHrefClick = (e) => {
        e.preventDefault();
        dispatch(openPopUpSignin());
        dispatch(closePopUpSignup())
    }

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        error: ""
    })

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const [visibility, setVisibility] = useState({
        vis1: false,
        vis2: false
    })

    const visibilitChange = (vis) => {
        setVisibility({ ...visibility, [vis]: !visibility[vis] })
    }
    const clickSubmit = () => {
        const user = {
            name: values.username || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
            confirmPassword: values.confirmPassword || undefined,
        }
        create(user).then((data) => {
            if (data.error) setValues({ ...values, error: data.error });
            else {
                setValues({ ...values, error: "" })
                dispatch(closePopUpSignup());
                dispatch(openPopUpSignin());
            }
        })
    }
    return (
        <div className="popUpIngredients">
            <div className="innerDiv signin" >
                <div className="signInLogo">
                    <img src={pizzaLogo} style={{ position: "relative", top: "50%", transform: "translate(0,-50%)" }} alt="pizza logo"></img>
                </div>
                <div className="signInRightSide">
                    <h2>Sign Up</h2>
                    <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "flex-end", borderBottom: "1px solid black", paddingBottom: "10px", margin: "0px 20px" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "-3px" }}>
                            <label>Username:</label>
                            <input type="text" value={values.username} onChange={handleChange("username")}></input>
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="text" value={values.email} onChange={handleChange("email")}></input>
                        </div>

                        <div className="password">
                            <label>Password:</label>

                            <input type={visibility.vis1 ? "text" : "password"} value={values.password} onChange={handleChange("password")}></input>
                            <div onClick={() => visibilitChange("vis1")}>
                                {visibility.vis1 ? <Icon icon="bi:eye" style={{ marginLeft: "-30px", cursor: "pointer" }} /> : <Icon icon="bi:eye-slash" style={{ marginLeft: "-30px", cursor: "pointer" }} />}
                            </div>

                        </div>
                        <div className="password">
                            <label>Password:</label>
                            <input type={visibility.vis2 ? "text" : "password"} value={values.confirmPassword} onChange={handleChange("confirmPassword")}></input>
                            <div onClick={() => visibilitChange("vis2")}>
                                {visibility.vis2 ? <Icon icon="bi:eye" style={{ marginLeft: "-30px", cursor: "pointer" }} /> : <Icon icon="bi:eye-slash" style={{ marginLeft: "-30px", cursor: "pointer" }} />}
                            </div>
                        </div>
                        {values.error && (<div style={{ width: "100%" }}>
                            <p style={{ fontStyle: "italic", textAlign: "center", color: "red", justifyContent: "center", fontWeight: "400", lineHeight: "0.5" }}>{values.error}</p>
                        </div>)}

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="signinButton" onClick={clickSubmit}>Sign up</button>
                    </div>
                    <p style={{ textAlign: "center" }}>Already have an account, <a href="/#" onClick={onHrefClick}>Sign in</a></p>
                </div>

            </div>
        </div >
    );
};

export default Signup;