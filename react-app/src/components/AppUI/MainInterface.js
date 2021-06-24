import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import Navigation from './NavBar/Navigation';
import SideBar from './SideBar/SideBar';
import Content from './Content/Content';
import './MainInterface.css';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getChannels } from '../../store/channels';
import { getDMUsers, setOnlineStatusUser } from '../../store/dm_people';
import { addChannelMessage } from "../../store/channel_messages"
import { addDirectMessage, getDirectMessages } from "../../store/direct_messages"
let socket;

const MainInterface = () => {
	const dispatch = useDispatch();


  	const location = useLocation()

	const [isAddDM, setIsAddDM] = useState(false)
	const [firstLoad, setFirstLoad] = useState(true)

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
		if(!firstLoad){
			socket = io();

			socket.on('connect', () => {
				for (let channel in channels) {
					socket.emit('join', {room:hashingRoom(channel)})
				}
				for (let dm in dmUsers){
					socket.emit('join', {room:hashingRoom(userId, dm)})
				}
				socket.emit('join', {room:"dm_user_change_room"})
			})

			dispatch(setOnlineStatusUser(userId, true))

			socket.on("chat", (chat) => {

					// when we recieve a chat, add it into our channelMessages object in redux
					dispatch(addChannelMessage(chat.channel_id, chat))
			})

			socket.on("dm", (dm) => {
				// when we recieve a dm, add it into our directMessages object in redux
				if (dm.recipient_id === userId){
					// console.log("I have recieved a dm---------", dm)
					window.localStorage.removeItem(dm.sender_id.toString())
					dispatch(addDirectMessage(dm.sender_id, dm))
				} else{
					// console.log("I have send a dm---------", dm)
					dispatch(addDirectMessage(dm.recipient_id, dm))
				}
			})

			socket.on("dm_change", (data) => {
				// console.log("There was a dm change----", Number(data.recipient_id),"  ", userId)
				if (parseInt(data.recipient_id) === userId){
					// console.log("right before dispatch")
					(async ()=>{
						socket.emit('join', {room:hashingRoom(userId, parseInt(data.sender_id))})
						await dispatch(getDMUsers())
						await dispatch(getDirectMessages(data.sender_id))

					})()
				} else if (parseInt(data.sender_id) === userId){
					// console.log("right before dispatch")
					socket.emit('join', {room:hashingRoom(userId, parseInt(data.recipient_id))})
					dispatch(getDirectMessages(data.recipient_id))
				}
			})

			setFirstLoad(true)

			return (()=>{
				dispatch(setOnlineStatusUser(userId, false))
				// for (let channel in channels) {
				// 	socket.emit('leave', {room:hashingRoom(channel)})
				// 	// console.log(socket.connected)
				// 	console.log("I have left room:  ", hashingRoom(channel))
				// 	// console.log(socket.connected)
				// }
				// for (let dm in dmUsers) {
				// 	socket.emit('leave', {room:hashingRoom(userId, dm)})
				// 	// console.log(socket.connected)
				// 	console.log("I have left dm:  ", hashingRoom(userId, dm))
				// 	socket.disconnect()
				// 	// console.log(socket.connected)
				// }
				// if (!(location.pathname.includes("dm") || location.pathname.includes("channels"))){
				// console.log("I'm disconnected")
				// socket.disconnect()
				// }
			  })
		}
	},[channels])

	useEffect(() => {
		(async () =>{
			await dispatch(getDMUsers());
			await dispatch(getChannels());
		})()
		setFirstLoad(false)
	}, [dispatch]);


	useEffect(() => {
		if (location.pathname.includes("dms")) {
			setIsAddDM(true);
		}
		else {
			setIsAddDM(false)
		}
	}, [location.pathname]);
	/*Need to add:
	Search bar
	components of rendered users
	GET RID OF P TAG :)
	*/
	return (
		<>
			<Navigation socket={socket}/>
			<div className="main-container">
				<SideBar />
				<Content isAddDM={isAddDM} socket={socket}/>
			</div>
		</>
	);
};

export default MainInterface;
