import React from 'react';
import './SideBar.css';
import DMs from './DMs';
import Channels from './Channels';
import { useSelector } from 'react-redux';
// import ContextMenu from './ContextMenu';


const SideBar = ({ setRoom }) => {
	const user = useSelector(state=>state.session.user)
	return (
		<div className="sidebar">
			<button className="workspace-menu">
				<div className="workspace-menu__info">
					<h1 className="workspace-menu__name">Juice Fans</h1>
					<div className="workspace-menu__status">
						<span className="workspace-menu__username">{`  ${user.firstname} ${user.lastname}`}</span>
					</div>
				</div>
				<span className="workspace-icon">
					<i className="far fa-edit"></i>
				</span>
			</button>

			<div className="threads">
				<div className="threads__items">
					<i className="far fa-comment-dots"></i>
					<span className="threads__icon"></span> All Threads
				</div>
				<div className="threads__items">
					<i className="fas fa-stream"></i>
					<span className="threads__icon"></span> All unreads
				</div>
				<div className="threads__items">
					<i className="far fa-comments"></i>
					<span className="threads__icon"></span> All DMs
				</div>
				<div className="threads__items">
					<i className="far fa-bookmark"></i>
					<span className="threads__icon"></span> Saved Items
				</div>
			</div>

			{/* <ContextMenu /> */}
			<Channels setRoom={setRoom} />
			<DMs />
		</div>
	);
};

export default SideBar;
