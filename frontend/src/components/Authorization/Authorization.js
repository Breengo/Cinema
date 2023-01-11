import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';

import { hideLoginWindow, showRegistrationWindow, loginWindowSelector } from "../../Redux/WindowsManagementSlice.js";
import { fetchAuthUser, selectIsAuth } from "../../Redux/auth.js";

import closeIcon from "../../images/x.svg";


export default function Authorization() {

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', shouldUseNativeValidation: true });

    const dispatch = useDispatch();
    const selector = useSelector(loginWindowSelector.getLoginWindow);
    const authSelector = useSelector(selectIsAuth)

    const onSubmit = async (data) => {
        setAuthError(false);
        dispatch(fetchAuthUser(data));
    }



    const [disappear, setDisappear] = React.useState(false);
    const [unblur, setUnblur] = React.useState(false);
    const [authError, setAuthError] = React.useState(false);

    if (authSelector && typeof authSelector != "object") {
        window.localStorage.setItem('token', 'Bearer ' + authSelector);
        window.location.reload();
    }
    if (authSelector && !authError && authSelector.message) {
        setAuthError(true);
    }

    React.useEffect(() => {
        setDisappear(false);
        setUnblur(false);
    }, [selector])

    return (
        <div>
            {selector && <div className={unblur ? "unblur blur_block" : "blur_block"}>
                <div onClick={(e) => { e.stopPropagation(); }} className={disappear ? "transparent authorization_block" : "authorization_block"}>
                    <h2>Sign In</h2>
                    <img onClick={() => {
                        setDisappear(true);
                        setUnblur(true);
                        setTimeout(() => {
                            dispatch(hideLoginWindow());
                        }, 500)
                    }} className="closeWindow" src={closeIcon} alt="error" />
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="login_form" action="submit">
                        <div className={authError ? "login_form_inputBox_invalid" : "login_form_inputBox"}>
                            <input {...register("userName", { required: true })} className="login_form_input" type="text" />
                            <span className="login_form_label">Username</span>
                            <i></i>
                        </div>
                        <div className={authError ? "login_form_inputBox_invalid" : "login_form_inputBox"}>
                            <input {...register("password", { required: true })} className="login_form_input" type="password" />
                            <span className="login_form_label">Password</span>
                            <i></i>
                        </div>
                        <div className="login_form_errorMessage">
                            {authError && <p>{authSelector.message}</p>}
                        </div>
                        <input className="btn login_form_btn" value="Sign In" type="submit" />
                        <div className="login_form_addFunctions">
                            <h3>Forgot Password</h3>
                            <h3 onClick={() => {
                                setDisappear(true);
                                setUnblur(true);
                                setTimeout(() => {
                                    dispatch(hideLoginWindow());
                                    dispatch(showRegistrationWindow());
                                }, 500)
                            }}>Sign Up</h3>
                        </div>
                    </form>
                </div>
            </div >}
        </div >
    )
}