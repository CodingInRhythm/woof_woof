import React from 'react';
import './SideBar.css';
import DMs from './DMs';
import Channels from './Channels';

const SideBar = () => {
	return (
		<div class="sidebar">
			<button class="workspace-menu">
				<div class="workspace-menu__info">
					<h1 class="workspace-menu__name">Juice Fans</h1>
					<div class="workspace-menu__status">
						<span class="workspace-menu__username">nasanov</span>
					</div>
				</div>
				<span class="workspace-icon">
					<i class="far fa-edit"></i>
				</span>
			</button>

			<div class="threads">
				<div class="threads__items">
					<i class="far fa-comment-dots"></i>
					<span class="threads__icon"></span> All Threads
				</div>
				<div class="threads__items">
					<i class="fas fa-stream"></i>
					<span class="threads__icon"></span> All unreads
				</div>
				<div class="threads__items">
					<i class="far fa-comments"></i>
					<span class="threads__icon"></span> All DMs
				</div>
				<div class="threads__items">
					<i class="far fa-bookmark"></i>
					<span class="threads__icon"></span> Saved Items
				</div>
			</div>
			<Channels />
			<DMs />
		</div>
	);
};

export default SideBar;
