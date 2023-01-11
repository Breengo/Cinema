import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";

import { hideChangePassword, changePasswordSelector, hideChangeEmail, updateUserInfo, selectChanged, changeEmailSelector } from "../../Redux/changeUserInfoSlice";

import closeIcon from "../../images/x.svg";

export default function ChangeUserInfo() {

    const dispatch = useDispatch();
    const selector = useSelector(changePasswordSelector.getChangePassword);
    const selector2 = useSelector(changeEmailSelector.getChangeEmail);
    const changeSelector = useSelector(selectChanged);

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', shouldUseNativeValidation: true });
    const onSubmit = (data) => {

        setRegError(false);

        if (selector && data.newPassword.length < 6) {
            return setInvalidPass(true)
        }
        else {
            setInvalidPass(false)
        }
        if (selector && data.ConfirmNewPassword !== data.newPassword) {
            return setInvalidConfPass(true);
        }
        else {
            setInvalidConfPass(false)
        }

        if (selector2 && (!data.email.includes("@") || !data.email.includes("." || !data.email.length < 5))) {
            return setInvalidEmail(true);
        }
        else {
            setInvalidEmail(false)
        }
        delete data.ConfirmNewPassword

        dispatch(updateUserInfo({ ...data, token: window.localStorage.getItem('token') }))
    }

    const [disappear, setDisappear] = React.useState(false);
    const [unblur, setUnblur] = React.useState(false);
    const [invalidPass, setInvalidPass] = React.useState(false);
    const [invalidConfPass, setInvalidConfPass] = React.useState(false);
    const [regError, setRegError] = React.useState(false);
    const [invalidEmail, setInvalidEmail] = React.useState(false);


    if (changeSelector && changeSelector.succesMessage) {
        window.localStorage.setItem('token', `Bearer ${changeSelector.succesMessage}`)
        window.location.reload();
    }
    if (changeSelector && !regError && changeSelector.message) {
        setRegError(true);
    }

    React.useEffect(() => {
        setDisappear(false);
        setUnblur(false);
    }, [selector,selector2])


    return (
        <div>
            {(selector || selector2) && <div className={unblur ? "unblur blur_block" : "blur_block"}>
                <div onClick={(e) => { e.stopPropagation(); }} className={disappear ? "transparent authorization_block" : "authorization_block"}>
                    <h2>{selector && "Change password"}{selector2 && "Change email"}</h2>
                    <img onClick={() => {
                        setDisappear(true);
                        setTimeout(() => {
                            if (selector) {
                                dispatch(hideChangePassword());
                            }
                            else {
                                dispatch(hideChangeEmail());
                            }
                        }, 500)
                    }} className="closeWindow" src={closeIcon} alt="error" />
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="login_form" action="submit">
                        <div className={invalidPass ? "login_form_inputBox_invalid" : "login_form_inputBox"}>
                            <input {...register("password", { required: true })} required className="login_form_input" type="password" />
                            <span className="login_form_label">Password</span>
                            <i></i>
                        </div>

                        {selector && <div className={invalidPass ? "login_form_inputBox_invalid" : "login_form_inputBox"}>
                            <input {...register("newPassword", { required: true })} required className="login_form_input" type="password" />
                            <span className="login_form_label">New password</span>
                            <i></i>
                        </div>}
                        {selector && invalidPass && <p className='login_form_errorMessage'>Password is too short</p>}
                        {selector && <div className={invalidConfPass ? "login_form_inputBox_invalid" : "login_form_inputBox"}>
                            <input {...register("ConfirmNewPassword", { required: true })} required className="login_form_input" type="password" />
                            <span className="login_form_label">Confrim new password</span>
                            <i></i>
                        </div>}
                        {selector && invalidConfPass && <p className='login_form_errorMessage'>Passwords do not match</p>}

                        {selector2 && <div className={invalidEmail ? "login_form_inputBox_invalid" : "login_form_inputBox"}>
                            <input {...register("email", { required: true })} required className="login_form_input" type="text" />
                            <span className="login_form_label">New email</span>
                            <i></i>
                        </div>}
                        {selector2 && invalidEmail && <p className='login_form_errorMessage'>Incorrect Email</p>}
                        <div className="login_form_errorMessage">
                            {regError && <p>{changeSelector.message}</p>}
                        </div>
                        <input className="btn login_form_btn" value="Change" type="submit" />
                        <div className="login_form_addFunctions login_form_registration">
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}