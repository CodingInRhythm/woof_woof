import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
// import logo from '../../images/slack_logo-ebd02d1.svg';

const SignUpForm = () => {
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [photo, setPhoto] = useState(null);
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const onSignUp = async e => {
		e.preventDefault();
		if (password === repeatPassword) {
			// await dispatch(signUp(username, email, password));
			await dispatch(signUp(username, firstName, lastName, email, photo, password))
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
		setPhoto(e.target.files[0]);
	};

	const updatePassword = e => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = e => {
		setRepeatPassword(e.target.value);
	};

	const logoClick = () => {
		history.push('/');
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
    <>
      <div className="login-container">
        <div></div>
        <div className="loginWrap">
          {/* <img
            src={logo}
            className="slack_logo"
            onClick={logoClick}
            alt="logo"
          ></img> */}
          <i
            onClick={logoClick}
            id="fa-dog_green-large_login"
            className="fas fa-dog"
          ></i>
          <h1 className="login-form-header">Join Woof Woof!</h1>

          <form className="signupform" onSubmit={onSignUp}>
            <div>
              <input
                name="username"
                id="username"
                type="text"
                required
                onChange={updateUsername}
                placeholder="Username"
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
                placeholder="First Name"
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
                placeholder="Last Name"
                className="login-input"
                value={lastName}
              />
            </div>
            <div>
              <input
                id="email"
                type="email"
                required
                onChange={updateEmail}
                placeholder="Email"
                className="login-input"
                value={email}
              />
            </div>

            <div className="photo-upload--form">
              <span id="file-chosen" className="photo-upload--filename">
                {photo ? `${photo.name}` : "No file chosen"}
              </span>
              <input
                type="file"
                id="actual-btn"
                onChange={updatePhoto}
                hidden
              />

              <label for="actual-btn" className="photo-upload--btn">
                <span id="actual-btn-text">Choose File</span>
              </label>

              {/* <input
								id="photo-btn"
								type="input"
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
                placeholder="Password"
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
                placeholder="Password Confirmation"
                className="login-input"
              />
            </div>
            <button type="submit" id="submitButton" className="login-btn">
              Sign Up
            </button>
          </form>
        </div>
        <div className="signup-link">
          <p className="switchLinkName">Already using Woof Woof?</p>
          <NavLink to="/login" className="switchLink">
            Sign in here
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
