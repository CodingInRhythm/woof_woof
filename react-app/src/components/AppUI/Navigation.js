import React from 'react';
import ava from '../../images/ava.png';

import './Navigation.css';

function Navigation({ isLoaded }) {
	const handleSearch = e => {
		e.preventDefault();
	};

	return (
		<nav className="main-nav">
			<form className="nav-search" onSubmit={handleSearch}>
				<input type="text" placeholder="Search..." className="nav-searchBar" />
			</form>
			<img src={ava} className="nav-logo" alt="nav-logo" height="70" />
		</nav>
	);
}

export default Navigation;
