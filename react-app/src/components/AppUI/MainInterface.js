import React, { useEffect, useState } from 'react';
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';
import { Route, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getChannels } from '../../store/channels';
import { getDMUsers } from '../../store/dm_people';

const MainInterface = () => {
	const dispatch = useDispatch();
	const location = useLocation()
		
	const [room, setRoom] = useState('');
	const [isAddDM, setIsAddDM] = useState(false)
	
	useEffect(() => {
		dispatch(getChannels());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getDMUsers());
	}, [dispatch]);

	useEffect(() => {
		console.log("hi im loading")
	}, [])

	useEffect(() => {
		if (location.pathname.includes("dms")) {
		setIsAddDM(true);
		}
	}, []);
	/*Need to add: 
	Search bar
	components of rendered users
	GET RID OF P TAG :)
	*/
	return (
		<>
			<Navigation />
			{isAddDM && (
				<p>Hello</p>
			)}
			<div className="main-container">
				<SideBar setRoom={setRoom} />
				<Content room={room} setRoom={setRoom} />
			</div>
		</>
	);
};

export default MainInterface;
