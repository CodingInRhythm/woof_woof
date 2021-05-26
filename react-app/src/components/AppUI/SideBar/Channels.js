import React, { useState, useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Channels.css';
import { NavLink, useLocation } from 'react-router-dom';

const Nav = ({ channel, setRoom }) => {
	const [isClicked, setIsClicked] = useState(false);

	let handleClick = () => {
		if (!isClicked) {
			setIsClicked(true);
		}
		setRoom(`Channel: ${channel.id}`);
	};

	let location = useLocation();
	const getNavLinkClass = path => {
		return location.pathname === path ? 'channels__button--active' : '';
	};

	return (
		<li
			key={channel.id}
			// className="channels__button"
			className={`channels__button` + ' ' + getNavLinkClass(`/channels/${channel.id}`)}
		>
			<NavLink onClick={handleClick} to={`/channels/${channel.id}`}>
				<span>{channel.name}</span>
			</NavLink>
		</li>
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

	const addChannel = () => {};

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
				<li className="channels__item">
					<button className="channels__add" onclick={addChannel}>
						<span className="dm__add--plussign">+</span>
						<span className="dm__add">Add channels</span>
					</button>
				</li>
			</ul>
		</div>
	);
};
export default Channels;
