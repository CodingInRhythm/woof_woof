import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Channels.css';
import './ContextMenu.css';
import { useLocation, NavLink } from 'react-router-dom';
import { addNewChannel } from '../../../store/channels';
import { getChannelMessages } from '../../../store/channel_messages';
import { ContextMenuWrapper, useContextMenuTrigger } from 'react-context-menu-wrapper';
import MyContextMenu from './ContextMenu';

const Nav = ({ channel, setRoom }) => {
	const [isClicked, setIsClicked] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [newMessage, setNewMessage] = useState(false);
	const dispatch = useDispatch();
	let location = useLocation();
	const channelMessageObj = useSelector(state => state.channelMessages);
	let channelMessageChannel;
	if (channelMessageObj[channel.id] !== undefined) {
		channelMessageChannel = channelMessageObj[channel.id];
	}

	let handleClick = e => {
		if (!isClicked) {
			setIsClicked(true);
			dispatch(getChannelMessages(channel.id));
		}
		setRoom(`Channel: ${channel.id}`);
		setNewMessage(false);
	};

	const getNavLinkClass = path => {
		return location.pathname === path ? 'channels__button--active' : '';
	};

	useEffect(() => {
		console.log('We have a new message!');
		if (location.pathname !== `/channels/${channel.id}` && isLoaded) {
			console.log('setting a class');
			setNewMessage(true);
		}
		setIsLoaded(true);
	}, [channelMessageChannel]);

	const menuId = 'channelMenu';
	const someRef = useContextMenuTrigger({ menuId: menuId, data: { name: 'Channel', id: channel.id } });

	return (
		<NavLink onClick={handleClick} to={`/channels/${channel.id}`}>
			<li
				ref={someRef}
				key={channel.id}
				className={`channels__button` + ' ' + getNavLinkClass(`/channels/${channel.id}`)}
			>
				<span className={newMessage ? 'new_message' : ''}>{channel.name}</span>
			</li>
		</NavLink>
	);
};

const Channels = ({ setRoom }) => {
	const channels = useSelector(state => state.channels);

	let arr = [];
	for (let i in channels) {
		arr.push(channels[i]);
	}
	// const handleRoom = () => {
	// 	setRoom(`Channel: ${channel.id}`)
	// };
	// const channelComponents = arr.map(channel => {
	// 	return (
	// 		<li key={channel.id} className="channels__button">
	// 			<NavLink
	// 				activeClassName="active"
	// 				onClick={setRoom(`Channel: ${channel.id}`)}
	// 				to={`/channels/${channel.id}`}
	// 			>
	// 				<span>{channel.name}</span>
	// 			</NavLink>
	// 		</li>
	// 	);
	// });

	const dispatch = useDispatch();
	const [isHidden, setHidden] = useState('true');
	const [newChannelName, setChannelName] = useState('');
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
		dispatch(addNewChannel(payload));
		setHidden(!isHidden);
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
				{arr?.map((channel, id) => (
					<Nav channel={channel} setRoom={setRoom} key={id} />
				))}
				<ContextMenuWrapper id={menuId}>
					<MyContextMenu />
				</ContextMenuWrapper>

				<li className="channels__item">
					<div className={`channel__add--form ${isHidden ? 'hidden' : null}`}>
						<input
							type="text"
							placeholder="Channel name"
							className="channels__add-input"
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
