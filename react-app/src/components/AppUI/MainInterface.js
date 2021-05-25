import React from 'react';
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';
import { Route, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainInterface = () => {
	let { id } = useParams();
	const channel = useSelector(state => state.channels[id]);
	// console.log('id', useParams());
	console.log('channel', channel);
	return (
		<>
			<Navigation />
			<div class="main-container">
				<SideBar />
				{/* <Route path="/channels/:id" exact={true}> */}
				<Content channel={channel} />
				{/* </Route> */}
				{/* <Content /> */}
			</div>
		</>
	);
};

export default MainInterface;
