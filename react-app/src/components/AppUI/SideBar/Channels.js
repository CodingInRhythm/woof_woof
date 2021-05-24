import React from 'react';
import './Channels.css';

const Channels = () => {
	return (
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
	);
};
export default Channels;
