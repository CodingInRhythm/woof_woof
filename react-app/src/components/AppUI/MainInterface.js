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
					window.localStorage.removeItem(dm.sender_id.toString())
					window.localStorage.setItem('newMsg', dm.sender_id)
					dispatch(addDirectMessage(dm.sender_id, dm))
				} else{
					dispatch(addDirectMessage(dm.recipient_id, dm))
				}
			})
			socket.on("dm_change", (data) => {
				if (parseInt(data.recipient_id) === userId){
					(async ()=>{
						socket.emit('join', {room:hashingRoom(userId, parseInt(data.sender_id))})
						await dispatch(getDMUsers())
						await dispatch(getDirectMessages(data.sender_id))

				})()
				} else if (parseInt(data.sender_id) === userId){
					socket.emit('join', {room:hashingRoom(userId, parseInt(data.recipient_id))})
					dispatch(getDirectMessages(data.recipient_id))
				}
			})
			setFirstLoad(true)

			return (()=>{
				dispatch(setOnlineStatusUser(userId, false))
			})
		}
	}, [channels])

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
				<SideBar socket={socket}/>
				<Content isAddDM={isAddDM} socket={socket}/>
			</div>
		</>
	);
};

export default MainInterface;
