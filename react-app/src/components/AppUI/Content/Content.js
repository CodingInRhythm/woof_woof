import React, { useEffect, useState } from 'react';
import './Content.css';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../../store/channel_messages';
import { useParams, useLocation } from 'react-router-dom';
import { getDirectMessages } from '../../../store/direct_messages';

const Content = ({ room, setRoom }) => {
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

	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const channel_messages = useSelector(state => state.channelMessages);
	const direct_messages = useSelector(state => state.directMessages);
	const userId = useSelector((state) => state.session.user.id)

	let slice;
	let roomNum;
	if (location.pathname.includes("channel")) {
		roomNum = room.split(" ")[1];
		slice = 'channelMessages'
		setRoom(hashingRoom(id))
	} else {
		roomNum = id
		setRoom(hashingRoom(userId, id))
		slice = "directMessages"
	}

	useEffect(() => {
		if (!channel_messages[id]) {
			dispatch(getChannelMessages(id));
		}
		if (!direct_messages[id]){
			dispatch(getDirectMessages(id))
		}
		console.log(room)
	}, [room, dispatch, id]);

	
	const messages = useSelector((state) => state[slice])
	
	const messageItem = messages[id]?.map(msg => {
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
						<ReactQuill
							placeholder={`Message #${messages[id]?.channel?.name}`}
							modules={modules}
							formats={formats}
							inputClass="main__chat-textarea"
						>
							<div className="my-editing-area" />
						</ReactQuill>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Content;
