import React, {useState, useEffect} from 'react';
// import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Channels.css';
import { NavLink } from 'react-router-dom';

const Nav = ({channel, setRoom}) =>{
	const [isClicked, setIsClicked] = useState(false)

	let handleClick = ()=>{
		if (!isClicked){
			setIsClicked(true)
		}
		setRoom(`Channel: ${channel.id}`)
	}

	return (
		<li key={channel.id} className="channels__button">
			<NavLink onClick={handleClick} to={`/channels/${channel.id}`}>
				<span>{channel.name}</span>
			</NavLink>
		</li>
	)
}


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
	// 			<NavLink onClick={setRoom(`Channel: ${channel.id}`)} to={`/channels/${channel.id}`}>
	// 				<span>{channel.name}</span>
	// 			</NavLink>
	// 		</li>
	// 	);
	// });

	return (
		<div className="channels">
			<h2 className="channels__heading">
				<span>
					Channels <span className="channels__number">({arr.length})</span>
				</span>
			</h2>
			<ul className="channels__list">
				<li className="channels__item">
					<button className="channels__button">
						<span>general</span>
					</button>
				</li>
				<li className="channels__item">
					<button className="channels__button">
						<span>2021-01-11-online</span>
					</button>
				</li>
				<li className="channels__item">
					<button className="channels__button channels__button--active">
						<span>2021-01-group02-juice-and-the-thunks</span>
					</button>
				</li>
				{arr?.map(channel=>
					<Nav channel={channel} setRoom={setRoom}/>
				)}
				{/* {channelComponents} */}
				<li className="channels__item">
					<button className="channels__add">
						<span className="dm__add--plussign">+</span>
						<span className="dm__add">Add channels</span>
					</button>
				</li>
			</ul>
		</div>
	);
};
export default Channels;
