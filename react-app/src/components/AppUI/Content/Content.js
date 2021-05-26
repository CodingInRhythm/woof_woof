import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import './Content.css';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages, addMessage as addChannelMessage } from '../../../store/channel_messages';
import { useParams, useLocation } from 'react-router-dom';
import { getDirectMessages } from '../../../store/direct_messages';


const Content = ({ room, setRoom, socket }) => {
	let modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			[{ font: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
			[{ align: [] }],
			['clean'],
		],
	}; 
	let formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
	];
	
	
	
	//val 1 will either be channelId or userId
	const hashingRoom = (val1, recipientId) => {
		if (!recipientId) {
			return `Channel: ${val1}`
		} 
		else {
			return `DM${val1 < recipientId ? val1 : recipientId}${val1 > recipientId ? val1 : recipientId}`;
		}
	}
	
	// let socket = io()
	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const channel_messages = useSelector(state => state.channelMessages);
	const direct_messages = useSelector(state => state.directMessages);
	const userId = useSelector((state) => state.session.user.id)
	
	const textInput = useRef(null)

	let textField;

	//Handle Send Message
	const sendMessage = (e) => {
		e.preventDefault();
		textField = textInput.current.state.value

		if(textField && textField !== "<br>"){
			let editor = textInput.current.getEditor()
			let text= editor.getText()
			editor.deleteText(0, text.length)

			if (location.pathname.includes("dm")){
				console.log("before dm")
				socket.emit("dm", {sender_id:userId, recipient_id: id, message:text, room:hashingRoom(userId, id)})
			} else{
				socket.emit("chat", {room:id, id:userId, message:text})
			}
			console.log(text)
		}
	}
	
	//Establish if DM or Channel and set room
	let slice;
	
	//Populate Store if nothing there
	useEffect(() => {
		if (location.pathname.includes("channel")) {
			slice = 'channelMessages'
			setRoom(hashingRoom(id))
		} else {
			setRoom(hashingRoom(userId, id))
			slice = "directMessages"
		}
		if (!channel_messages[id] && slice ==="channelMessages") {
			dispatch(getChannelMessages(id));
		}
		if (!direct_messages[id] && slice ==="directMessages"){
			dispatch(getDirectMessages(id))
		}
		console.log(slice)
	}, [slice, id]);
						
						
	const messages = useSelector((state) => state[slice])
	let messageItem;
	if (messages !== undefined){
	messageItem = messages[id]?.map(msg => {
		let date = new Date(msg?.created_at).toDateString() + ' ' + new Date(msg?.created_at).toLocaleTimeString();
		return (
			<div className="main__chat-item">
				<div className="chat__image-container">
					<img src={ava} alt="profile-photo" className="chat__avatar"></img>
				</div>
				<div className="chat__other-info">
					<span className="chat__username">{msg.user.firstname + ' ' + msg.user.lastname}</span>
					<span className="chat__date">{date}</span>
					<p className="chat__text">{msg.message}</p>
				</div>
			</div>
		);
	});
	}
	
	const Quill = (<ReactQuill
		// placeholder={`Message #${messages[id]?.channel?.name}`}
		modules={modules}
		formats={formats}
		inputClass="main__chat-textarea"
		id = "input_field"
		ref={textInput}
		>
		<div className="my-editing-area" />
		</ReactQuill>)
		
		
		return (
			<div className="main">
			<header className="main__header">
				<div className="main__channel-info">
					<h1 className="main__h3">#2021-01-group02-juice-and-the-thunks</h1>
				</div>
				<div className="main__channel-members">
					<div>
						<i className="fas fa-user-friends"></i> <span className="main_channel-members-h3">View Members</span>
					</div>
					<div>
						<i className="fas fa-user-plus"></i> <span className="main_channel-members-h3">Add Members</span>
					</div>
				</div>
			</header>
			<div className="main__content">
				<div className="main__container">
					<section className="main__chat">{messageItem}</section>
					<section className="main__chat-textarea">
						<form onSubmit={sendMessage}>
							{Quill}
							<button type="submit">Send</button>
						</form>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Content;
