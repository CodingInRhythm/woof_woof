import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../../store/channels';
import { getDMUsers } from '../../store/dm_people';
import { addChannelMessage } from "../../store/channel_messages"
import { addDirectMessage } from "../../store/direct_messages"
let socket;

const MainInterface = () => {
	const dispatch = useDispatch();
	const dmUsers = useSelector(state => state.dm_users)
	const channels = useSelector(state => state.channels)
	const userId = useSelector(state => state.session.user.id)
	// const directMessages = useSelector(state => state.directMessages)

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
		socket = io();
		for (let channel in channels) {
			socket.on('connect', () => {
					socket.emit('join', {room:hashingRoom(channel)})
					console.log("I have joined room:  ", hashingRoom(channel))
				})
			}
		for (let dm in dmUsers){
			socket.on('connect', () => {
				socket.emit('join', {room:hashingRoom(userId, dm)})
				console.log("I have joined dm:  ", hashingRoom(userId, dm))
			})
		}
		socket.on("chat", (chat) => {
				// when we recieve a chat, add it into our channelMessages object in redux
				console.log("I'm a new chat-------", chat)
				dispatch(addChannelMessage(chat.channel_id, chat))
			})
		socket.on("dm", (dm) => {
			// when we recieve a dm, add it into our directMessages object in redux
			if (dm.recipient_id === userId){
				console.log("I have recieved a dm---------", dm)
				dispatch(addDirectMessage(dm.sender_id, dm))
			} else{
				console.log("I have send a dm---------", dm)
				dispatch(addDirectMessage(dm.recipient_id, dm))
			}
		})

		return (()=>{
			for (let channel in channels) {
				socket.emit('leave', {room:hashingRoom(channel)})
				console.log("I have left room:  ", hashingRoom(channel))
				socket.disconnect()
			}
			for (let dm in dmUsers) {
				socket.emit('leave', {room:hashingRoom(userId, dm)})
				console.log("I have left dm:  ", hashingRoom(userId, dm))
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
