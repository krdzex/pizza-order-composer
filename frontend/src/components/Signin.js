import React, { useState } from 'react';
import pizzaLogo from "../images/logo.png"
import { useDispatch } from 'react-redux';
import { closePopUpSignin, openPopUpSignup } from '../actions';
import { signin } from '../apiService/userApi';
import auth from "../apiService/auth-helper"
const Signin = () => {
    const dispatch = useDispatch()

    const [values, setValues] = useState({
        name: "",
        password: "",
        error: ""

    })

    const onChangeHandler = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onHrefClick = (e) => {
        e.preventDefault();
        dispatch(openPopUpSignup());
        dispatch(closePopUpSignin())
    }

    const onSubmitClick = () => {
        let user = {
            name: values.name || undefined,
            password: values.password || undefined
        }

        signin(user).then((data) => {
            if (data.error) setValues({ ...values, error: data.error })
            else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: "" });
                    dispatch(closePopUpSignin())
                })
            }
        })
    }

    return (
        <div className="popUpIngredients">
            <div className="innerDiv signin" >
                <div className="signInLogo">
                    <img src={pizzaLogo} alt="pizza logo"></img>
                </div>
                <div className="signInRightSide">
                    <h2>Sign in</h2>
                    <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "flex-end", borderBottom: "1px solid black", paddingBottom: "10px", margin: "0px 20px" }}>
                        <div>
                            <label>Username:</label>
                            <input type="text" value={values.name} onChange={onChangeHandler("name")} ></input>
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={values.password} onChange={onChangeHandler("password")}></input>
                        </div>
                        {values.error && (<div style={{ width: "100%" }}>
                            <p style={{ fontStyle: "italic", textAlign: "center", color: "red", justifyContent: "center", fontWeight: "400", lineHeight: "0.5" }}>{values.error}</p>
                        </div>)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center',marginTop: "5px" }}>
                        <button className="signinButton" onClick={onSubmitClick}>Sign in</button>
                    </div>
                    <p style={{ textAlign: "center" }}>No account, <a href="/#" onClick={onHrefClick}>Sign up</a></p>
                </div>

            </div>
        </div >
    );
};

export default Signin;