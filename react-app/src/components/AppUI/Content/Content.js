import React, { useEffect, useState } from 'react';
import './Content.css';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages } from '../../../store/channel_messages';
import { useParams, useLocation } from 'react-router-dom';

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
	console.log(location)
	const dispatch = useDispatch();
	const channel_messages = useSelector(state => state.channelMessages);
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
	}, [room, dispatch, id]);


	const messages = useSelector((state) => state[slice][roomNum])
	
	// console.log(messages[id]);
	const messageItem = messages[id]?.map(msg => {
		let date = new Date(msg?.created_at).toDateString() + ' ' + new Date(msg?.created_at).toLocaleTimeString();
		return (
			<div class="main__chat-item">
				<div class="chat__image-container">
					<img src={ava} alt="profile-photo" class="chat__avatar"></img>
				</div>
				<div class="chat__other-info">
					<span class="chat__username">{msg.user.firstname + ' ' + msg.user.lastname}</span>
					<span class="chat__date">{date}</span>
					<p class="chat__text">{msg.message}</p>
				</div>
			</div>
		);
	});

	return (
		<div class="main">
			<header class="main__header">
				<div class="main__channel-info">
					<h1 class="main__h3">#2021-01-group02-juice-and-the-thunks</h1>
				</div>
				<div class="main__channel-members">
					<div>
						<i class="fas fa-user-friends"></i> <span class="main_channel-members-h3">View Members</span>
					</div>
					<div>
						<i class="fas fa-user-plus"></i> <span class="main_channel-members-h3">Add Members</span>
					</div>
				</div>
			</header>
			<div class="main__content">
				<div class="main__container">
					<section class="main__chat">{messageItem}</section>
					<section class="main__chat-textarea">
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
