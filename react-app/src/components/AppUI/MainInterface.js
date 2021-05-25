import React, { useEffect, useState } from 'react';
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';
import { Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getChannels } from '../../store/channels';

const MainInterface = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getChannels());
	}, [dispatch]);

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
