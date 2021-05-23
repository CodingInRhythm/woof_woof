import React from 'react';
import './SideBar.css';

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
			<div class="channels">
				<h2 class="channels__heading">
					<span>
						Channels <span class="channels__number">(9)</span>
					</span>
				</h2>
				<ul class="channels__list">
					<li class="channels__item">
						<button class="channels__button">
							<span>general</span>
						</button>
					</li>
					<li class="channels__item">
						<button class="channels__button">
							<span>2021-01-11-online</span>
						</button>
					</li>
					<li class="channels__item">
						<button class="channels__button">
							<span>2021-01-gp6-kangchenjunga</span>
						</button>
					</li>
					<li class="channels__item">
						<button class="channels__button channels__button--active">
							<span>2021-01-group02-juice-and-the-thunks</span>
						</button>
					</li>
					<li class="channels__item">
						<button class="channels__button">
							<span>2021-01-online-project-questions</span>
						</button>
					</li>
					<li class="channels__item">
						<button class="channels__button">
							<span>2021-01-team-polis</span>
						</button>
					</li>
					<li class="channels__item">
						<button class="channels__add">
							<span class="dm__add--plussign">+</span>
							<span class="dm__add">Add channels</span>
						</button>
					</li>
				</ul>
			</div>
			<div class="dm">
				<h2 class="dm__heading">
					<span>
						Direct messages <span class="dm__number">(10)</span>
					</span>
				</h2>
				<ul class="dm__list">
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Brent Arimoto</span>
						</button>
					</li>
					<li class="dm__item">
						{/* <i class="fas fa-smile"></i> */}
						<button class="dm__button">
							<span>Zane Preudhomme</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Alex Clough</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Brad Simpson</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button">
							<span>Juliet Shafto</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Jeff Granof</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button">
							<span>Juliet Shafto</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Jeff Granof</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button">
							<span>Juliet Shafto</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Jeff Granof</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button">
							<span>Juliet Shafto</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Jeff Granof</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button">
							<span>Juliet Shafto</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Jeff Granof</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button">
							<span>Juliet Shafto</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button dm__button--online">
							<span>Jeff Granof</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__button">
							<span>Nurs Asanov (Should I be able to text )</span>
						</button>
					</li>
					<li class="dm__item">
						<button class="dm__add">
							<span class="dm__add--plussign">+</span>
							<span class="dm__add">Add teammates</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideBar;
