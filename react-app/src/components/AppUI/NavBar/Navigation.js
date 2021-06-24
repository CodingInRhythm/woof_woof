import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useSelector } from 'react-redux';
import SearchAll from '../Search/SearchAll'

import UserProfileModal from '../UserProfile/UserProfileModal'

function Navigation({ isLoaded }) {
	const user = useSelector(state => state.session.user);

	return (
    <nav className="main-nav">
      <NavLink to="/" className='main-nav-home'>
        <i className="fas fa-home"></i>
      </NavLink>
      <SearchAll />
      <div className="username_logo">
        <span className="username">{user.username}</span>
        <div className="nav-logo">
          <UserProfileModal profileUser={user} />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
