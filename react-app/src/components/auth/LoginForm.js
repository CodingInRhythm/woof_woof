import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css';
import logo from '../../images/slack_logo-ebd02d1.svg';

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const onLogin = async e => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data.errors) {
			setErrors(data.errors);
		}
	};

	const updateEmail = e => {
		setEmail(e.target.value);
	};

	const updatePassword = e => {
		setPassword(e.target.value);
	};

	const logoClick = () => {
		history.push('/')
	}

	const demoClick = async e => {
		e.preventDefault();
		await dispatch(login("demo@aa.io", "password"));
	}

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<div className="login-container">
				<div></div>
				<div className="loginWrap">
					<img src={logo} className="slack_logo" onClick={logoClick}></img>
					<h1 className="login-form-header">Sign in to Slack</h1>
					<form onSubmit={onLogin}>
						{errors.length ? (
							<div className="errorsContainer">
								<span>The following errors occurred:</span>
								<ul className="errorsList">
									{errors.map((error, idx) => (
										<li key={idx}>{error}</li>
									))}
								</ul>
							</div>
						) : (
							<div></div>
						)}
						<input
							id="email"
							type="text"
							required
							onChange={updateEmail}
							placeholder="name@email.com"
							className="login-input"
						/>
						<input
							id="password"
							type="password"
							value={password}
							onChange={updatePassword}
							required
							placeholder="password"
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
				<div className="signup-link">
					<p className="switchLinkName">New to Slack?</p>
					<NavLink to="/sign-up" className="switchLink">
						Create an account
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
