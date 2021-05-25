import React from 'react';
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';
import { Route } from 'react-router-dom';

const MainInterface = () => {
	return (
		<>
			<Navigation />
			<div class="main-container">
				<SideBar />
				<Content />
			</div>
		</>
	);
};

export default MainInterface;
