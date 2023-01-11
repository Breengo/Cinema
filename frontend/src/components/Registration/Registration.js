import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { fetchRegisterUser, selectRegistered } from '../../Redux/auth.js';

import {
  hideRegistrationWindow,
  showLoginWindow,
  registrationWindowSelector,
} from '../../Redux/WindowsManagementSlice.js';

import closeIcon from '../../images/x.svg';

export default function Registration() {
  const dispatch = useDispatch();
  const selector = useSelector(registrationWindowSelector.getRegistrationWindow);
  const regSelector = useSelector(selectRegistered);
  const [choicedRole, setChoicedRole] = React.useState('USER');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit', shouldUseNativeValidation: true });
  const onSubmit = (data) => {
    setRegError(false);

    data.email = data.email.toString();
    if (data.userName.length < 5) {
      return setInvalidName(true);
    } else {
      setInvalidName(false);
    }
    if (!data.email.includes('@') || !data.email.includes('.') || data.email.length < 5) {
      return setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
    }
    if (data.password.length < 6) {
      return setInvalidPass(true);
    } else {
      setInvalidPass(false);
    }
    if (data.ConfirmPassword !== data.password) {
      return setInvalidConfPass(true);
    } else {
      setInvalidConfPass(false);
    }
    data.role = choicedRole;

    dispatch(fetchRegisterUser(data));
  };

  const [disappear, setDisappear] = React.useState(false);
  const [unblur, setUnblur] = React.useState(false);
  const [invalidName, setInvalidName] = React.useState(false);
  const [invalidPass, setInvalidPass] = React.useState(false);
  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [invalidConfPass, setInvalidConfPass] = React.useState(false);
  const [regError, setRegError] = React.useState(false);

  if (regSelector && typeof regSelector != 'object') {
    window.localStorage.setItem('token', 'Bearer ' + regSelector);
    window.location.reload();
  }
  if (regSelector && !regError && regSelector.message) {
    setRegError(true);
  }

  React.useEffect(() => {
    setDisappear(false);
    setUnblur(false);
  }, [selector]);

  return (
    <div>
      {selector && (
        <div className={unblur ? 'unblur blur_block' : 'blur_block'}>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={disappear ? 'transparent authorization_block' : 'authorization_block'}>
            <h2>Sign Up</h2>
            <img
              onClick={() => {
                setDisappear(true);
                setTimeout(() => {
                  dispatch(hideRegistrationWindow());
                }, 500);
              }}
              className="closeWindow"
              src={closeIcon}
              alt="error"
            />
            <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
              className="login_form"
              action="submit">
              <div className={invalidName ? 'login_form_inputBox_invalid' : 'login_form_inputBox'}>
                <input
                  {...register('userName', { required: true })}
                  required
                  className="login_form_input"
                  type="text"
                />
                <span className="login_form_label">Username</span>
                <i></i>
              </div>
              {invalidName && <p className="login_form_errorMessage">Username is too short</p>}
              <div className={invalidEmail ? 'login_form_inputBox_invalid' : 'login_form_inputBox'}>
                <input
                  {...register('email', { required: true })}
                  required
                  className="login_form_input"
                  type="text"
                />
                <span className="login_form_label">Email</span>
                <i></i>
              </div>
              {invalidEmail && <p className="login_form_errorMessage">Incorrect Email</p>}
              <div className={invalidPass ? 'login_form_inputBox_invalid' : 'login_form_inputBox'}>
                <input
                  {...register('password', { required: true })}
                  required
                  className="login_form_input"
                  type="password"
                />
                <span className="login_form_label">Password</span>
                <i></i>
              </div>
              {invalidPass && <p className="login_form_errorMessage">Password is too short</p>}
              <div
                className={invalidConfPass ? 'login_form_inputBox_invalid' : 'login_form_inputBox'}>
                <input
                  {...register('ConfirmPassword', { required: true })}
                  required
                  className="login_form_input"
                  type="password"
                />
                <span className="login_form_label">Confrim Password</span>
                <i></i>
              </div>
              {invalidConfPass && <p className="login_form_errorMessage">Passwords do not match</p>}
              <div className="login_form_errorMessage">
                {regError && <p>{regSelector.message}</p>}
              </div>
              <div className="registration_form_chooseRole">
                <h3
                  onClick={() => setChoicedRole('USER')}
                  className={choicedRole === 'USER' ? 'registration_form_choicedRole' : ''}>
                  User
                </h3>
                <h3
                  onClick={() => setChoicedRole('ADMIN')}
                  className={choicedRole === 'ADMIN' ? 'registration_form_choicedRole' : ''}>
                  Admin
                </h3>
              </div>
              <input className="btn login_form_btn" value="Sign Up" type="submit" />
              <div className="login_form_addFunctions login_form_registration">
                <h3
                  onClick={() => {
                    setDisappear(true);
                    setUnblur(true);
                    setTimeout(() => {
                      dispatch(hideRegistrationWindow());
                      dispatch(showLoginWindow());
                    }, 500);
                  }}>
                  Sign In
                </h3>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
