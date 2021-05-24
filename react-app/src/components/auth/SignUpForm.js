import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../../images/slack_logo-ebd02d1.svg';

const SignUpForm = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async e => {
		e.preventDefault();
		if (password === repeatPassword) {
			await dispatch(signUp(username, email, password));
		}
	};

	const updateUsername = e => {
		setUsername(e.target.value);
	};

	const updateEmail = e => {
		setEmail(e.target.value);
	};

	const updatePassword = e => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = e => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}
	return (
		<>
			<div className="login-container">
				<div></div>
				<div className="loginWrap">
					<img src={logo} class="slack_logo"></img>
					<h1 className="login-form-header">Join Slack</h1>

					<form onSubmit={onSignUp}>
						<div>
							<label>
								<input
									name="username"
									id="username"
									type="text"
									required
									onChange={updateUsername}
									placeholder="username"
									className="login-input"
									value={username}
								/>
							</label>
						</div>
						<div>
							<label>
								<input
									id="email"
									type="text"
									required
									onChange={updateEmail}
									placeholder="name@email.com"
									className="login-input"
								/>
							</label>
						</div>
						<div>
							<label>
								<input
									id="password"
									type="password"
									value={password}
									onChange={updatePassword}
									required
									placeholder="password"
									className="login-input"
								/>
							</label>
						</div>
						<div>
							<label>
								<input
									id="password"
									type="password"
									name="repeat_password"
									onChange={updateRepeatPassword}
									value={repeatPassword}
									required={true}
									placeholder="repeat password"
									className="login-input"
								/>
							</label>
						</div>
						<button type="submit" id="submitButton" className="login-btn">
							Sign Up
						</button>
					</form>
				</div>
				<div class="signup-link">
					<p className="switchLinkName">Already using Slack?</p>
					<NavLink to="/login" className="switchLink">
						Sign in here
					</NavLink>
				</div>
			</div>
		</>
	);
};

export default SignUpForm;
