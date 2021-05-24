import React from 'react';
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';

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
