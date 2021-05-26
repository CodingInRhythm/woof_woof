import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './PageNotFound.css';
import logo from '../../images/slackbot_sad.png';

const PageNotFound = () => {
	return (
		<>
			<div className="login-container">
				<div></div>
				<div className="notfound__wrap">
					<img src={logo} class="notfound__logo"></img>
					<h1 className="notfound__text">I'm sorry, this page doesn't exist</h1>
					<div className="notfound__links">
						<div className="notfound__signup-link">
							<p className="switchLinkName">New to Slack?</p>
							<NavLink to="/sign-up" className="switchLink">
								Create an account
							</NavLink>
						</div>
						<div className="notfound__home-link">
							<p className="switchLinkName">Return to the</p>
							<NavLink to="/" className="switchLink">
								Home page
							</NavLink>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PageNotFound;