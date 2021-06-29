import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Channels.css';
import './ContextMenu.css';
import { useLocation, NavLink } from 'react-router-dom';
import { addNewChannel } from '../../../store/channels';
import { getChannelMessages } from '../../../store/channel_messages';
import { ContextMenuWrapper, useContextMenuTrigger } from 'react-context-menu-wrapper';
import MyContextMenu from './ContextMenu';
import { editChannel } from '../../../store/channels';

const hashingRoom = (val1, recipientId) => {
	if (!recipientId) {
		return `Channel: ${val1}`
	}
	else {
		return `DM${val1 < recipientId ? val1 : recipientId}${val1 > recipientId ? val1 : recipientId}`;
	}
}

const Nav = ({ channel, editOn, setEditOn }) => {
	const [isClicked, setIsClicked] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [newMessage, setNewMessage] = useState(false);
	const [numberMessages, setNumberMessages] = useState(0);
	const [newChannelName, setNewChannelName] = useState(channel.name);

	const dispatch = useDispatch();
	let location = useLocation();
	const channelMessageObj = useSelector(state => state.channelMessages);
	let channelMessageChannel;
	if (channelMessageObj[channel.id]) {
		channelMessageChannel = channelMessageObj[channel.id];
	}

	let handleClick = e => {

		if (!isClicked) {
			dispatch(getChannelMessages(channel.id));
			setIsClicked(true);
		}
		setNewMessage(false)
		setNumberMessages(0)
	}


	const getNavLinkClass = path => {
		return location.pathname === path ? 'channels__button--active' : '';
	};

	useEffect(() => {
		if (location.pathname !== `/channels/${channel.id}` && isLoaded) {
			setNewMessage(true);
			setNumberMessages(numberMessages + 1);
		}
		setIsLoaded(true);
		return () => {
			setIsLoaded(false);
		};
	}, [channelMessageChannel]);

	const menuId = 'channelMenu';
	const channelRef = useContextMenuTrigger({
		menuId: menuId,
		data: { name: 'Channel', id: channel.id, channelName: channel.name },
	});

	const handleEditChannel = e => {
		e.preventDefault();
		dispatch(editChannel(channel.id, newChannelName));
		setEditOn(null);
	};

	if (editOn === channel.id) {
		return (
			<li className="channels__button">
				<input
					type="text"
					placeholder="Type new channel name"
					value={newChannelName}
					className="editInputForm"
					onChange={e => setNewChannelName(e.target.value)}
				></input>
				<button className="channels__add--btn" onClick={handleEditChannel}>
					<span className="channels__edit-btn">
						<i className="fas fa-pen-square"></i>
					</span>
				</button>
				<button className="channels__add--btn" onClick={() => setEditOn(null)}>
					<span className="channels__edit-cancel">
						<i className="fas fa-ban"></i>
					</span>
				</button>
			</li>
		);
	} else {
		return (
			<NavLink onClick={handleClick} to={`/channels/${channel.id}`}>
				<li
					ref={channelRef}
					id={'channel_' + channel.id}
					key={channel.id}
					className={`channels__button` + ' ' + getNavLinkClass(`/channels/${channel.id}`)}
				>
					<span className={newMessage ? 'new_message' : ''}>{channel.name}</span>
					<span className={numberMessages > 0 ? 'new_message-number' : 'hidden'}>{numberMessages}</span>
				</li>
			</NavLink>
		);
	}
};

const Channels = ({socket}) => {
	const channels = useSelector(state => state.channels);

	let arr = [];
	for (let i in channels) {
		arr.push(channels[i]);
	}

	const dispatch = useDispatch();
	const [isHidden, setHidden] = useState('true');
	const [newChannelName, setChannelName] = useState('');
	const [editOn, setEditOn] = useState(null);

	const user = useSelector(state => state.session.user);
	const toggleAddChannel = () => {
		setHidden(!isHidden);
	};

	const addChannel = () => {
		const payload = {
			user_id: user.id,
			name: newChannelName,
			is_channel: true,
		};
		if (newChannelName !== '') {
			(async()=>{
				const newChannel = await dispatch(addNewChannel(payload));
				socket.emit('join', {room:hashingRoom(newChannel.id)})
				setHidden(!isHidden);
				setChannelName('');
			})()
		}
	};

	const menuId = 'channelMenu';

	return (
		<div className="channels">
			<h2 className="channels__heading">
				<span>
					Channels <span className="channels__number">({arr.length})</span>
				</span>
			</h2>
			<ul className="channels__list">
				{channels && Object.entries(channels)?.map(([id, channel]) => (
					<Nav channel={channel} key={channel.id} editOn={editOn} setEditOn={setEditOn} />


				))}
				<ContextMenuWrapper id={menuId}>
					<MyContextMenu setEditOn={setEditOn} />
				</ContextMenuWrapper>

				<li className="channels__item">
					<div className={`channel__add--form ${isHidden ? 'hidden' : null}`}>
						<input
							type="text"
							placeholder="Channel name"
							className="channels__add-input"
							value={newChannelName}
							onChange={e => setChannelName(e.target.value)}
						></input>
						<button className="channels__add--btn" onClick={addChannel}>
							<span className="channels__add-plussign">+</span>
						</button>
					</div>
					<button className="channels__add" onClick={toggleAddChannel}>
						<span className="dm__add--plussign">+</span>
						<span className="dm__add">Add channels</span>
					</button>
				</li>
			</ul>
		</div>
	);
};
export default Channels;
