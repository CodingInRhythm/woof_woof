import React, { useEffect, useState } from 'react';
// import { io } from "socket.io-client";
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';
import { useDispatch } from 'react-redux';
import { getChannels } from '../../store/channels';
import { getDMUsers } from '../../store/dm_people';

const MainInterface = () => {
	const dispatch = useDispatch();
	// const socket = io();

	useEffect(() => {
		dispatch(getChannels());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getDMUsers());
	}, [dispatch]);

	useEffect(() => {

	}, [])

	const [room, setRoom] = useState('');

	return (
		<>
			<Navigation />
			<div className="main-container">
				<SideBar setRoom={setRoom} />
				<Content room={room} setRoom={setRoom} />
			</div>
		</>
	);
};

export default MainInterface;
