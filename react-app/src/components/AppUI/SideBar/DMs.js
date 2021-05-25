import React from 'react';
// import React from 'react';
import './DMs.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DMs = () => {
	const dm_people = useSelector(state => state.dm_users);

	let arr = [];
	for (let i in dm_people) {
		arr.push(dm_people[i]);
	}

	const peopleComponent = arr.map(user => {
		return (
			<li key={user.id} className="dm__item">
				<NavLink
					to={`/dms/${user.id}`}
					className={`dm__button ${user.online_status ? 'dm__button--online' : ''}`}
				>
					<span>{user.firstname + ' ' + user.lastname}</span>
				</NavLink>
			</li>
		);
	});

	return (
		<div class="dm">
			<h2 class="dm__heading">
				<span>
					Direct messages <span class="dm__number">({arr.length})</span>
				</span>
			</h2>
			<ul class="dm__list">
				{peopleComponent}
				<li class="dm__item">
					<button class="dm__add">
						<span class="dm__add--plussign">+</span>
						<span class="dm__add">Add teammates</span>
					</button>
				</li>
			</ul>
		</div>
	);
};
export default DMs;
