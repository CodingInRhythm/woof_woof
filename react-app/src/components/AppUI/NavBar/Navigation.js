import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useSelector } from 'react-redux';
import SearchAll from '../Search/SearchAll'

import UserProfileModal from '../UserProfile/UserProfileModal'

function Navigation({ isLoaded }) {
	const handleSearch = e => {
		e.preventDefault();
	};
	const user = useSelector(state => state.session.user);

	return (
		<nav className="main-nav">
			<NavLink to="/">
				<i className="fas fa-home"></i>
			</NavLink>
			<SearchAll />
			{/* <form className="nav-search" onSubmit={handleSearch}>

				<input type="text" placeholder="Search..." className="nav-searchBar" />
			</form> */}
			<span className="username">{user.username}</span>
			<div className="nav-logo">
				<UserProfileModal profileUser={user}/>
			</div>
		</nav>
	);
}

export default Navigation;
