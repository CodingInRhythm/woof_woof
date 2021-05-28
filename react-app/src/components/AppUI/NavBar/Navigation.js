import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useSelector } from 'react-redux';

import UserProfileModal from '../UserProfile/UserProfileModal'

function Navigation({ isLoaded }) {
	const handleSearch = e => {
		e.preventDefault();
	};
	const user = useSelector(state => state.session.user);

	return (
		<nav className="main-nav">
			<form className="nav-search" onSubmit={handleSearch}>
				<NavLink to="/">
					<i className="fas fa-home"></i>
				</NavLink>

				<input type="text" placeholder="Search..." className="nav-searchBar" />
			</form>
			<span className="username">{user.username}</span>
			<UserProfileModal profileUser={user} classname={'nav-logo'}/>
		</nav>
	);
}

export default Navigation;
