import React from 'react';
import {useSelector} from 'react-redux'
import './SideBar.css';
import DMs from './DMs';
import Channels from './Channels';
// import ContextMenu from './ContextMenu';
import {useUserSearch} from '../../../context/UserSearch'

const SideBar = ({ setRoom }) => {
	const user = useSelector(state=>state.session.user)
	const {searchParam, setSearchParam, matchingUsers, setMatchingUsers} = useUserSearch()
	const resetSearch = () => {
		console.log('MAKING RESETET SEARCH?')
		console.log(searchParam)
		setSearchParam("")
		console.log(searchParam);
		setMatchingUsers("")
	}
	return (
		<div onClick={resetSearch} className="sidebar">
			<button className="workspace-menu">
				<div className="workspace-menu__info">
					<h1 className="workspace-menu__name">Juice Fans</h1>
					<div className="workspace-menu__status">
						<span className="workspace-menu__username">{`  ${user.username}`}</span>
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
			<Channels />
			<DMs />
		</div>
	);
};

export default SideBar;
