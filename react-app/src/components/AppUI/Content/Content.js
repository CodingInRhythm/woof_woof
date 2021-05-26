import React, { useEffect, useRef, useState } from 'react';
import { io } from "socket.io-client";
import './Content.css';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6
import Message from './Message'
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
			['clean'],
		],
	}; 
	let formats = [
		'header',
		'bold',
		'italic',
		'font',
		'underline',
		'strike',
		'blockquote',
		'code-block',
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
  
  const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const channel_messages = useSelector(state => state.channelMessages);
	const direct_messages = useSelector(state => state.directMessages);
	const userId = useSelector((state) => state.session.user.id)
  
  const textInput = useRef(null)
  
  let slice;
	let roomNum;
	if (location.pathname.includes('channel')) {
		roomNum = room.split(' ')[1];
		slice = 'channelMessages';
		setRoom(hashingRoom(id));
	} else {
		roomNum = id;
		setRoom(hashingRoom(userId, id));
		slice = 'directMessages';
	}
  
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
 
	useEffect(() => {
		if (location.pathname.includes("channel")) {
			slice = 'channelMessages'
			setRoom(hashingRoom(id))
		} else {
			setRoom(hashingRoom(userId, id))
			slice = "directMessages"
		}
		if (!channel_messages[id]) {
			dispatch(getChannelMessages(id));
		}
		if (!direct_messages[id]) {
			dispatch(getDirectMessages(id));
		}
	}, [room, dispatch, id]);

	console.log('slice----', slice);
	console.log('roomnum----', room);
	const messages = useSelector(state => state[slice]);

	// console.log('messages id ----------------', messages[id]);

	// const messageItem = messages[id]?.map(msg => {
	// 	let date = new Date(msg?.created_at).toDateString() + ' ' + new Date(msg?.created_at).toLocaleTimeString();
	// 	return (
	// 		<div class="main__chat-item">
	// 			<div class="chat__image-container">
	// 				<img src={msg.user?.profile_photo ? msg.user.profile_photo : ava} alt="profile-photo" class="chat__avatar"></img>
	// 			</div>
	// 			<div className="chat__other-info">
	// 				<span className="chat__username">{msg.user.firstname + ' ' + msg.user.lastname}</span>
	// 				<span className="chat__date">{date}</span>
	// 				<p className="chat__text">{msg.message}</p>
	// 			</div>
	// 			<div class="chat__extra-options">
	// 				<div class="chat__edit">
	// 					<button>Edit</button>
	// 				</div>
	// 				<div class="chat__delete">
	// 					<button>Delete</button>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);
	// });
	// }
			
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
		<div class="main__content">
			<div class="main__container">
				<section class="main__chat">
					{messages[id]?.map(msg => (
						<Message key={msg.id} msg={msg} modules={modules} formats={formats}/>
					))}
				</section>
				<section class="main__chat-textarea">
		<form onSubmit={sendMessage}>
			<ReactQuill
			placeholder={`Message #${messages[id]?.channel?.name}`}
			modules={modules}
			formats={formats}
			inputClass="main__chat-textarea"
			id="input_field"
			ref={textInput}
			// onChange={handleChange}
			>
			<div className="my-editing-area"></div>
			</ReactQuill>
			<button className="main__chat-send" type="submit">
			<i class="fas fa-paper-plane"></i>
			</button>
		</form>
				</section>
			</div>
		</div>
	</div>
	);
};

export default Content;
