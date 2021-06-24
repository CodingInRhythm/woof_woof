import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({socket}) => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</li>
				<li>
					<NavLink to="/sign-up" exact={true} activeClassName="active">
						Sign Up
					</NavLink>
				</li>
				<li>
					<NavLink to="/users" exact={true} activeClassName="active">
						Users
					</NavLink>
				</li>
				<li>
					<NavLink to="/app_ui" exact={true} activeClassName="active">
						App UI
					</NavLink>
				</li>
				<li>
					<LogoutButton socket={socket}/>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
