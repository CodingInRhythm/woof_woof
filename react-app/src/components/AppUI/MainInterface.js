import React from 'react';
import Navigation from './Navigation';
import SideBar from './SideBar';
import Content from './Content';
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
