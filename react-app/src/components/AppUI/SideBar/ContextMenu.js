import React from 'react';
import './ContextMenu.css';
import { useContextMenuEvent } from 'react-context-menu-wrapper';

// Edit channel
import { useDispatch } from 'react-redux';
import { deleteChannel } from '../../../store/channels';

const MyContextMenu = () => {
	const dispatch = useDispatch();

	const menuEvent = useContextMenuEvent();
	if (!menuEvent || !menuEvent.data) return null;

	const handleDeleteChannel = () => {
		dispatch(deleteChannel(menuEvent.data.id));
	};

	return (
		<div className="context-menu">
			{/* <p>
				This belongs to {menuEvent.data.name} with id {menuEvent.data.id}!
			</p> */}
			<li>
				<button className="context-menu--btn">
					<span className="context-menu--text">
						<i class="fas fa-pencil-alt"></i>Edit Channel
					</span>
				</button>
			</li>
			<li>
				<button className="context-menu--btn" onClick={handleDeleteChannel}>
					<span className="context-menu--text">
						<i class="fas fa-trash-alt"></i>Leave Channel
					</span>
				</button>
			</li>
		</div>
	);
};
export default MyContextMenu;
