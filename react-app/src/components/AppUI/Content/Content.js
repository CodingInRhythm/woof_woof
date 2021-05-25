import React, { useEffect, useState } from 'react';
import './Content.css';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6
import { useSelector } from 'react-redux';

const Content = () => {
	let modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
			['link', 'image'],
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

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`/api/channel/2`);
			// const response = await fetch(`/api/dms/`);
			const responseData = await response.json();
			setMessages(responseData.message);
		}
		fetchData();
	}, []);
	console.log('******************************');
	console.log(messages);
	console.log('******************************');

	const msg = messages.map(msg => {
		return (
			<li key={msg.id} className="channels__button">
				<span>{msg.id}</span>
			</li>
		);
	});

	return (
		<div class="main">
			<header class="main__header">
				{msg}
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
					<section class="main__chat">
						<div class="main__chat-item">
							<div class="chat__image-container">
								<img src={ava} alt="profile-photo" class="chat__avatar"></img>
							</div>
							<div class="chat__other-info">
								<span class="chat__username">Alex Clough</span>
								<span class="chat__date">8:16 PM</span>
								<p class="chat__text">
									<span class="chat__text--link">@Nurs Asanov</span> would you mind sharing the link
									to the tutorial that you used to write the code you shared w us earlier? Thanks!
								</p>
							</div>
						</div>
						<div class="main__chat-item">
							<div class="chat__image-container">
								<img src={ava} alt="profile-photo" class="chat__avatar"></img>
							</div>
							<div class="chat__other-info">
								<span class="chat__username">Alex Clough</span>
								<span class="chat__date">6:55 PM</span>
								<p class="chat__text">
									<span class="chat__text--link">
										https://github.com/CodingInRhythm/slack_clone/wiki/User-Story
									</span>
								</p>
							</div>
						</div>
						<div class="main__chat-item">
							<div class="chat__image-container">
								<img src={ava} alt="profile-photo" class="chat__avatar"></img>
							</div>
							<div class="chat__other-info">
								<span class="chat__username">Alex Clough</span>
								<span class="chat__date">6:55 PM</span>
								<p class="chat__text">
									<span class="chat__text--link">
										https://github.com/CodingInRhythm/slack_clone/wiki/User-Story
									</span>
								</p>
							</div>
						</div>
						<div class="main__chat-item">
							<div class="chat__image-container">
								<img src={ava} alt="profile-photo" class="chat__avatar"></img>
							</div>
							<div class="chat__other-info">
								<span class="chat__username">Alex Clough</span>
								<span class="chat__date">10:00 AM</span>
								<p class="chat__text">
									One implementation we can draw from for a react-redux front end with websockets:
									<span class="chat__text--link">
										https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
									</span>
								</p>
							</div>
						</div>
						<div class="main__chat-item">
							<div class="chat__image-container">
								<img src={ava} alt="profile-photo" class="chat__avatar"></img>
							</div>
							<div class="chat__other-info">
								<span class="chat__username">Jeff Granof</span>
								<span class="chat__date">11:31 AM</span>
								<p class="chat__text">
									<span class="chat__text--link">
										https://github.com/appacademy-starters/express-project-planning-example/wiki/MVP-Feature-List
									</span>
								</p>
							</div>
						</div>
						<div class="main__chat-item">
							<div class="chat__image-container">
								<img src={ava} alt="profile-photo" class="chat__avatar"></img>
							</div>
							<div class="chat__other-info">
								<span class="chat__username">Nurs Asanov</span>
								<span class="chat__date">12:31 AM</span>
								<p class="chat__text">PUSHED :ok_hand::skin-tone-2:</p>
							</div>
						</div>
					</section>
					<section class="main__chat-textarea">
						<ReactQuill
							placeholder="Message #2021-01-group02-juice-and-the-thunks"
							modules={modules}
							formats={formats}
						>
							<div className="my-editing-area" />
						</ReactQuill>
						{/* RICH TEXT EDITOR
						<input type="textarea" placeholder="Rich text editor should be here"></input> */}
					</section>
				</div>
			</div>
		</div>
	);
};

export default Content;
