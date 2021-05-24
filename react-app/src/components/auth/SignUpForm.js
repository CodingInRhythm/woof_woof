import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import logo from '../../images/slack_logo-ebd02d1.svg';

const SignUpForm = () => {
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [photo, setPhoto] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async e => {
		e.preventDefault();
		if (password === repeatPassword) {
			await dispatch(signUp(username, email, password));
			// await dispatch(signup(username, firstName, lastName, email, photo, password))
		}
	};

	const updateUsername = e => {
		setUsername(e.target.value);
	};

	const updateFirstName = e => {
		setFirstName(e.target.value);
	};

	const updateLastName = e => {
		setLastName(e.target.value);
	};

	const updateEmail = e => {
		setEmail(e.target.value);
	};

	const updatePhoto = e => {
		setPhoto(e.target.value);
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
					<img src={logo} class="slack_logo" alt="logo"></img>
					<h1 className="login-form-header">Join Slack</h1>

					<form onSubmit={onSignUp}>
						<div>
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
						</div>
						<div>
							<input
								name="firstName"
								id="firstName"
								type="text"
								required
								onChange={updateFirstName}
								placeholder="first name"
								className="login-input"
								value={firstName}
							/>
						</div>
						<div>
							<input
								name="lastName"
								id="lastName"
								type="text"
								required
								onChange={updateLastName}
								placeholder="last name"
								className="login-input"
								value={lastName}
							/>
						</div>
						<div>
							<input
								id="email"
								type="text"
								required
								onChange={updateEmail}
								placeholder="name@email.com"
								className="login-input"
								value={email}
							/>
						</div>
						<div className="photo-upload--form">
							<input type="file" id="actual-btn" hidden />

							<label for="actual-btn" className="photo-upload--btn">
								Choose File
							</label>

							<span id="file-chosen" className="photo-upload--filename">
								No file chosen
							</span>
							{/* <input
								id="photo-btn"
								type="file"
								onChange={updatePhoto}
								placeholder="profile_photo.jpg"
								className="photo-upload--input"
								value={photo}
							/>
							<button className="photo-upload--btn">
								<i class="fas fa-file-upload"></i>
							</button> */}
						</div>
						<div>
							<input
								id="password"
								type="password"
								value={password}
								onChange={updatePassword}
								required
								placeholder="password"
								className="login-input"
							/>
						</div>
						<div>
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
