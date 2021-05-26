import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../../store/channels';
import { getDMUsers } from '../../store/dm_people';
import { addMessage as addChannelMessage } from "../../store/channel_messages"
const MainInterface = () => {
	const dispatch = useDispatch();
	const dmUsers = useSelector(state => state.dmUsers)
	const channels = useSelector(state => state.channels)
	const socket = io();

	const hashingRoom = (val1, recipientId) => {
		if (!recipientId) {
			return `Channel: ${val1}`
		} 
		else {
			return `DM${val1 < recipientId ? val1 : recipientId}${val1 > recipientId ? val1 : recipientId}`;
		}
	}

	useEffect(() => {
		dispatch(getChannels());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getDMUsers());
	}, [dispatch]);

	useEffect(() => {
		for (let channel in channels) {
			socket.on('connect', () => {
					socket.emit('join', {room:hashingRoom(channel)})
					console.log("I have joined room:  ", hashingRoom(channel))
				})
			}
		socket.on("chat", (chat) => {
				// when we recieve a chat, add it into our channelMessages object in redux
				console.log("I'm a new chat-------", chat)
				dispatch(addChannelMessage(chat.channel_id, chat))
			})
			
		return (()=>{
			for (let channel in channels) {
				socket.emit('leave', {room:hashingRoom(channel)})
				console.log("I have left room:  ", hashingRoom(channel))
				socket.disconnect()
			}
		  })
	},[dmUsers, channels])

	const [room, setRoom] = useState('');

	return (
		<>
			<Navigation />
			<div className="main-container">
				<SideBar setRoom={setRoom} />
				<Content room={room} setRoom={setRoom} socket={socket}/>
			</div>
		</>
	);
};

export default MainInterface;
