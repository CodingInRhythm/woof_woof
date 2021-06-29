/*************************** REACT IMPORTS ***************************/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill'; // ES6


/*************************** OTHER FILE IMPORTS ***************************/
import { joinChannel } from '../../../store/channels';
import { getChannelMessages } from '../../../store/channel_messages';
import { getDirectMessages } from '../../../store/direct_messages';
import { getDMUser } from '../../../store/dm_people';
import { useUserSearch } from "../../../context/UserSearch";
import ProfilePhoto from "../UserProfile/ProfilePhoto"
import Message from './Message';
import './Content.css';

/*************************** COMPONENTS ***************************/
const Content = ({ isAddDM, socket }) => {
	/******************** VARIABLES********************/
	let modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			[{ font: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
			['clean'],
		],
		keyboard: {
			bindings: {
				enter: {
					key: 13,
					handler: function () {
					},
				},
			},
		},
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


	const { id } = useParams();

	const location = useLocation();
	const dispatch = useDispatch();
	const channels = useSelector(state => state.channels);
	const direct_messages = useSelector(state => state.directMessages);
	const dms = useSelector(state => state.dm_users);
	const user = useSelector(state => state.session.user);
	const userId = user.id

	const [firstLoad, setFirstLoad] = useState(true)

	const bottomRef = useRef(null)

	const history = useHistory();

	const { searchParam, setSearchParam, matchingUsers, setMatchingUsers } = useUserSearch();

	const textInput = useRef(null);

    localStorage.setItem('lastPage', location.pathname)

	let slice;

	if (location.pathname.includes("channel")) {
		slice = "channelMessages";
	}
	else if (location.pathname === "/dms/all") {
		slice = "dm_users"
	}
	else if (location.pathname.includes("dm/")) {
		slice = "directMessages"
	}

    let messages = useSelector(state => state[slice])

	let textField;

	let messageItem;

	let isChannelIn = channels[id]


	/******************** FUNCTIONS ********************/
	//val 1 will either be channelId or userId
	const hashingRoom = (val1, recipientId) => {
		if (!recipientId) {
			return `Channel: ${val1}`;
		} else {
			return `DM${val1 < recipientId ? val1 : recipientId}${val1 > recipientId ? val1 : recipientId}`;
		}
	};

	//Handle Send Message
	const sendMessage = e => {
		e.preventDefault();
		textField = textInput.current.state.value;
		if (textField && textField !== '<br>') {
			const editor = textInput.current.getEditor();
			const justText = editor.getText()

			// TODO: h2 for headings, pre for codeblock, etc
			const text = textField.slice(0, 2) + " class='chat__text'" + textField.slice(2);

			editor.deleteText(0, text.length);

			if (location.pathname.includes('dm') && justText.length>1){
				if (Object.keys(direct_messages[id]).length<1) {
					socket.emit("dm_change", {recipient_id: id, sender_id: userId})
				}
				socket.emit("dm", {sender_id:userId, recipient_id: id, message:text, room:hashingRoom(userId, id)})
			} else if (justText.length>1){
				socket.emit("chat", {room:id, id:userId, message:text, roomHash:hashingRoom(id)})
			}
		}
	};

	const handleClick = (id) => {
		if (window.localStorage.getItem(id.toString())) {
			window.localStorage.removeItem(id.toString())
		}
		return
	}


	const scrollToBottom = () => {
		bottomRef.current.scrollIntoView({ behavior: "smooth" })
	}

	//FUNCTIONS//
	const handleKeyPress = (e) => {
		e.preventDefault();
		let value = textInput.current;
		if (value && value !== '<p><br></p>' && e.key  === 'Enter'){
			sendMessage(e);
		}
	}

	const handleJoin =(e) => {
		(async()=>{
			const channel_obj = {
				user_id: user.id,
				channel_id: id
			}
			await dispatch(joinChannel(channel_obj))
			socket.emit('join', {room:hashingRoom(id)})
		})()
	}

	/******************** USE EFFECTS ********************/

	useEffect(() => {
		if(!firstLoad){
			dispatch(getChannelMessages(id));
		}
		setFirstLoad(false)
	}, [user.profile_photo])

	useEffect(() => {
		if(bottomRef.current){
			scrollToBottom()
		}
	}, [messages[id]])

	//  Get messages if not in store
	useEffect(() => {

		if (!messages[id] && slice === "channelMessages") {
			dispatch(getChannelMessages(id));
		}
		else if (!messages[id] && slice === "directMessages" ) {
			if (!dms[id]){
				dispatch(getDMUser(id));
			}
			dispatch(getDirectMessages(id));
		}
	}, [ dispatch, id, dms, location.pathname]);


	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch('/api/search/users',{
				method: 'POST',
				headers : {
					'Content-Type' : 'application/json'
				},
				body: JSON.stringify({searchParam}),
			});
			const data = await res.json();
			setMatchingUsers(data.users)
		};

		if (searchParam.length > 0) fetchUsers()
		else { setMatchingUsers([])}
	}, [searchParam]);


	/******************** INNER COMPONENT ********************/
	if (location.pathname.includes("dms")) {
		if (localStorage.getItem("refreshPage")){
			let url = localStorage.getItem("refreshPage")
			localStorage.removeItem("refreshPage")
			history.push(url);
		}
		messageItem = Object.keys(messages).map((msg, idx) => {
			let person;
			let mostRecentMessage;
			if (direct_messages[messages[msg].id]){
				let values = Object.values(direct_messages[messages[msg].id])
				if (values.length){
					person=values[values.length-1].user.firstname
					mostRecentMessage=values[values.length-1].message
				}
			} else {
				let recipient_message = messages[msg].recipient_messages[0]
				let sender_message = messages[msg].sender_messages[0]
				if (recipient_message && sender_message){
					person= sender_message.id > recipient_message.id ? messages[msg].firstname : user.firstname
					mostRecentMessage = sender_message.id > recipient_message.id ? sender_message.message : recipient_message.message
				} else if (recipient_message){
					person = user.firstname
					mostRecentMessage = recipient_message.message
				} else if (sender_message){
					person = messages[msg].firstname
					mostRecentMessage = sender_message.message
				}
			}

			return (
				<Link
				key={idx}
				onClick={() => handleClick(messages[msg].id)}

				to={`/dm/${messages[msg].id}`}
				>
				<div className="main__chat-item">
					<div className="chat__image-container">
						<ProfilePhoto profileUser={messages[msg]} alt={messages[msg].username}/>
					</div>
					<div className="chat__other-info">
						{messages[msg].firstname + " " + messages[msg].lastname}
						{person && <div className="chat__other-info-lastmessage"><div>{person}:</div> <div dangerouslySetInnerHTML={{ __html: mostRecentMessage }}></div></div>}
					</div>
				</div>
				</Link>
			);
		});
	}
	/******************** MAIN COMPONENT ********************/
	return (
		<div className="main">
			<header className="main__header">
				<div className="main__channel-info">
					{isAddDM ? (
						<div>
							<h1 className="main__h3">All Direct Messages</h1>
						</div>
					) : (
						<>
							{slice==='channelMessages' &&
							<>
								<li
									className={`channels__header`}
								>
									{channels[id]?.name}
								</li>
								<span className="channels__header--members"><i className="fas fa-users"></i>    </span><span className="channels__header--count">{channels[id]?.users_in?.length}</span>
							</>
							}
							{slice==='directMessages' &&
								<li
									className={`dms__header`}
								>
									{dms[id]?.firstname && `${dms[id]?.firstname} ${dms[id]?.lastname}`}
								</li>
							}
						</>
					)}
				</div>
				{slice==='channelMessages' &&
				<div className="main__channel-members">
					{!isChannelIn && <div>
						<i className="fas fa-user-plus" onClick={handleJoin}></i>{' '}
						<span className="main_channel-members-h3">Join</span>
					</div>}
				</div>}
			</header>
			<div className="main__content">
				{isAddDM ? (
					<>
						<div className='main__add-teammate-div'>
							<form autoComplete="off" className='main__add-teammate'>
								<h2 className='main__add-teammate-header'>To:</h2>
								<input
									className='main__add-teammate-input'
									type="text"
									name="searchParam"
									value={searchParam}
									onChange={e => setSearchParam(e.target.value)}
									placeholder="@somebody"
								/>
							{matchingUsers.length > 0 && (
								<ul className='main__add-teammate-list'>
									{matchingUsers.map((user, index) => {
										return (
											<Link name={user.id} to={`/dm/${user.id}`} className='main__add-teammate-item'>
												<div className='main__add-teammate-image'>
													<ProfilePhoto profileUser={user} alt={user.username}/>
												</div>
												<span className='main__add-teammate-name'>{`${user.firstname} ${user.lastname}`}</span>
												<span className='main__add-teammate-user_email'>{`${user.username} (${user.email})`}</span>
											</Link>
										);
									})}
								</ul>
							)}
							</form>
							<section className="main__add-teammate-existing">{messageItem}</section>
						</div>
					</>
				) : (
					<>
						<section className="main__chat">
							<div ref={bottomRef}/>
							{messages &&
								messages[id] &&
								Object.entries(messages[id])
									.reverse()
									?.map(([id, msg]) => (
										<Message key={msg.id+(msg.channel_id ? 'channel' : 'dm')} msg={msg} modules={modules} formats={formats} />
									))}
						</section>
						{(slice === "directMessages" || isChannelIn) &&
						<section className="main__chat-textarea">
							<form onSubmit={sendMessage} onKeyUp={handleKeyPress}>
								<ReactQuill
									modules={modules}
									formats={formats}
									inputClass="main__chat-textarea"
									id="input_field"
									ref={textInput}
								>
									<div className="my-editing-area"></div>
								</ReactQuill>
								<button className="main__chat-send" type="submit">
									<i className="fas fa-paper-plane"></i>
								</button>
							</form>
						</section>}
					</>
				)}
			</div>
		</div>
	);
};


/*************************** EXPORT ***************************/
export default Content;
