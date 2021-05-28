import React, { useState } from 'react';
import './ContextMenu.css';
import { useContextMenuEvent } from 'react-context-menu-wrapper';
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../../store/channels';

const MyContextMenu = ({ setEditOn }) => {
	const dispatch = useDispatch();
	const menuEvent = useContextMenuEvent();

	if (!menuEvent || !menuEvent.data) return null;

	console.group('**************');
	console.log(menuEvent.data.channelName);
	console.log(menuEvent.data.name);
	console.log(menuEvent.data.id);
	console.groupEnd('**************');

	const handleDeleteChannel = () => {
		dispatch(deleteChannel(menuEvent.data.id));
	};

	const toggleEditChannel = () => {
		setEditOn(menuEvent.data.id);
	};

	return (
		<div className="context-menu">
			{/* <p>
				This belongs to {menuEvent.data.name} with id {menuEvent.data.id}!
			</p> */}

			<li>
				<button
					className="context-menu--btn"
					// onClick={handleEditChannel}
					onClick={toggleEditChannel}
				>
					<span className="context-menu--text">
						<i className="fas fa-pencil-alt"></i>Edit Channel
					</span>
				</button>
			</li>
			<li>
				<button className="context-menu--btn" onClick={handleDeleteChannel}>
					<span className="context-menu--text">
						<i className="fas fa-trash-alt"></i>Leave Channel
					</span>
				</button>
			</li>
		</div>
	);
};
export default MyContextMenu;
