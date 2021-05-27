import React, { useState, useEffect } from 'react';
// import React from 'react';
import './DMs.css';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getDirectMessages } from '../../../store/direct_messages';
import { hideUser } from "../../../store/dm_people";

const DMPerson = ({ recipient }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [isClicked, setIsClicked] = useState(false);
	const [newMessage, setNewMessage] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false)
	const [numberMessages, setNumberMessages] = useState(0)

	let location = useLocation();
	const directMessageObj = useSelector(state => state.directMessages)
	let directMessageChannel;
	if (directMessageObj[recipient.id] !== undefined){
		directMessageChannel = directMessageObj[recipient.id]
	}

	const handleClick = () => {
		if (!isClicked) {
			dispatch(getDirectMessages(recipient.id));
			setIsClicked(true);
		}
		history.push(`/dm/${recipient.id}`)
		setNewMessage(false)
		setNumberMessages(0)
	}
	const removeDM = (e) => {
		console.log('here')
		let recipientid = e.target.id

		
		console.log(recipientid)
	}
	const getNavLinkClass = path => {
		return location.pathname === path ? 'dm__button--active' : '';
	};

	const getOnlineStatus = () => {
		return recipient.online_status ? 'dm__button--online' : ''
	}



	useEffect(() => {
		console.log("We have a new message!")
		if(location.pathname !== `/dm/${recipient.id}` && isLoaded){
			setNewMessage(true)
			setNumberMessages(numberMessages + 1)
		}
		setIsLoaded(true)
	},[directMessageChannel])

	return (
    <li key={recipient.id}>
      <button
        id={`dm_${recipient.id}`}
        onClick={handleClick}
        className={
          `dm__button` +
          " " +
          getNavLinkClass(`/dm/${recipient.id}`) +
          " " +
          getOnlineStatus()
        }
      >
        <span
          className={newMessage ? "new_message" : ""}
        >{`${recipient.firstname} ${recipient.lastname}`}</span>

        {numberMessages ? (
          <span className="new_message-number">{numberMessages}</span>
        ) : (
          <button id={recipient.id} onClick={removeDM} className="remove-dm">x</button>
        )}
      </button>
    </li>
  );
};

const DMs = () => {
	const conversations = useSelector(state => state.dm_users);
	const history = useHistory();
	let arr = [];
	for (let user in conversations) {
		if (user.isVisible) {
		arr.push(conversations[user]);
		}}
	

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
