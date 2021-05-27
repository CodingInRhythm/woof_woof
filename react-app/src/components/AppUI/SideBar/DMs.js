import React, { useState } from 'react';
// import React from 'react';
import './DMs.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getDirectMessages } from '../../../store/direct_messages';

const DMPerson = ({ recipient }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isClicked, setIsClicked] = useState(false);
	let location = useLocation();
	const handleClick = () => {
		if (!isClicked) {
			dispatch(getDirectMessages(recipient.id));
			setIsClicked(true);
		}
		history.push(`/dm/${recipient.id}`)
	}

	const getNavLinkClass = path => {
		return location.pathname === path ? 'dm__button--active' : '';
	};

	return (
		<li key={recipient.id}>
			<button
				id={`dm_${recipient.id}`}
				onClick={handleClick}
				className={`dm__button` + ' ' + getNavLinkClass(`/dm/${recipient.id}`)}
			>
				<span>{`${recipient.firstname} ${recipient.lastname}`}</span>
			</button>
		</li>
	);
};

const DMs = () => {
	const conversations = useSelector(state => state.dm_users);
	const history = useHistory();
	let arr = [];
	for (let i in conversations) {
		arr.push(conversations[i]);
	}

	//FUNCTIONS

	const newMessage = () => {
		history.push('/dms/all');
	};
	//Component is mapping thru conversations

	return (
		<div className="dm">
			<h2 className="dm__heading">
				<span>
					Direct messages <span className="dm__number">({arr.length})</span>
				</span>
			</h2>

			<ul className="dm__list">
				{arr?.map((conversation, i) => (
					<DMPerson recipient={conversation} key={i} />
				))}
				<li className="dm__item">
					<button onClick={newMessage} className="dm__add">
						<span className="dm__add--plussign">+</span>
						<span className="dm__add">Add teammates</span>
					</button>
				</li>
			</ul>
		</div>
	);
};
export default DMs;
