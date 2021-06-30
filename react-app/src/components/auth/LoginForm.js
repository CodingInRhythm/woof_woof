import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const onLogin = e => {
		e.preventDefault();
    (async()=>{
      const data = await dispatch(login(credential, password));
      if (data.errors) {
        setErrors(data.errors);
        return
      }
      history.push('/dms/all');
    })()
	};

	const updateCredential = e => {
		setCredential(e.target.value);
	};

	const updatePassword = e => {
		setPassword(e.target.value);
	};

	const logoClick = () => {
		history.push('/');
	};

	const demoClick = e => {
		e.preventDefault();
    (async()=>{
      await dispatch(login('demo@aa.io', 'password'));
      history.push('/dms/all');
    })()
	};

	if (user) {
		return <Redirect to="app_ui" />;
	}

	return (
    <>
      <div className="login-container">
        <div></div>
        <div className="loginWrap">
          <i onClick={logoClick} id="fa-dog_green-large_login" className="fas fa-dog"></i>
          <h1 className="login-form-header">Sign in to Woof Woof</h1>
		  <div className="signup-link">
			<p className="switchLinkName">New to Woof Woof?</p>
			<NavLink to="/sign-up" className="switchLink">
				Create an account
			</NavLink>
          </div>
          <form onSubmit={onLogin}>
            {errors.length>0 && (
              <div className="errorsContainer">
                <span>The following errors occurred:</span>
                <ul className="errorsList">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <input
              id="credential"
              type="text"
              required
              onChange={updateCredential}
              placeholder="Username/Email"
              className="login-input"
            />
            <input
              id="password"
              type="password"
              value={password}
              onChange={updatePassword}
              required
              placeholder="Password"
              className="login-input"
            />
            <button type="submit" id="submitButton" className="login-btn">
              Sign In With Email
            </button>
            <button id="demoButton" className="demo-btn" onClick={demoClick}>
              Demo Login
            </button>
          </form>
        </div>

      </div>
    </>
  );
};

export default LoginForm;
