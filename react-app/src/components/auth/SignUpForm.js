import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
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
    (async()=>{
      if (password === repeatPassword) {
        const data = await dispatch(signUp(username, firstName, lastName, email, photo, password))
        if (data.errors) {
          setErrors(data.errors);
          return
        }
        history.push('/dms/all');
      } else{
        setErrors(['password: Passwords do not match'])
      }
    })()
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

	const demoClick = e => {
		e.preventDefault();
    (async()=>{
      await dispatch(login('demo@aa.io', 'password'));
      history.push('/dms/all');
    })()
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
          <i
            onClick={logoClick}
            id="fa-dog_green-large_login"
            className="fas fa-dog"
          ></i>
          <h1 className="login-form-header">Join Woof Woof!</h1>
		  <div className="signup-link">
			<p className="switchLinkName">Already using Woof Woof?</p>
			<NavLink to="/login" className="switchLink">
				Sign in here
			</NavLink>
          </div>
          <form className="signupform" onSubmit={onSignUp}>
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

              <label htmlFor="actual-btn" className="photo-upload--btn">
                <span id="actual-btn-text">Choose File</span>
              </label>
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
			<button id="demoButton" className="demo-btn" onClick={demoClick}>
              Demo Login
            </button>
          </form>
        </div>

      </div>
    </>
  );
};

export default SignUpForm;
