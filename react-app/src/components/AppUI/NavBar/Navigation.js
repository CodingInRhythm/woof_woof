import React from 'react';
import { NavLink } from 'react-router-dom';
import ava from '../../../images/ava.png';
import './Navigation.css';
import { useSelector } from 'react-redux';

function Navigation({ isLoaded }) {
	const handleSearch = e => {
		e.preventDefault();
	};
	const user = useSelector(state => state.session.user);

	return (
		<nav className="main-nav">
			<form className="nav-search" onSubmit={handleSearch}>
				<NavLink to="/">
					<i class="fas fa-home"></i>
				</NavLink>

				<input type="text" placeholder="Search..." className="nav-searchBar" />
			</form>
			<span class="username">{user.username}</span>
			<img src={ava} className="nav-logo" alt="nav-logo" height="70" />
		</nav>
	);
}

export default Navigation;
