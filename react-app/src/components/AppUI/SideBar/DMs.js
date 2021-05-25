import React, { useEffect, useState } from 'react';
import './DMs.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DMs = () => {
	const [users, setUsers] = useState([]);
	const user = useSelector(state => state.session.user);
	const userId = user.id;

	// useEffect(() => {
	// 	async function fetchData() {
	// 		const response = await fetch(`/api/messages/dm/userId`);
	// 		// const response = await fetch(`/api/dms/`);
	// 		const responseData = await response.json();
	// 		setUsers(responseData.users);
	// 		console.log(responseData);
	// 	}
	// 	fetchData();
	// }, []);

	// const userComponents = users.map(user => {
	// 	return (
	// 		<li key={user.id} className="dm__item">
	// 			<NavLink
	// 				to={`/users/${user.id}`}
	// 				className={`dm__button ${user.online_status ? 'dm__button--online' : ''}`}
	// 			>
	// 				<span>{user.firstname + ' ' + user.lastname}</span>
	// 			</NavLink>
	// 		</li>
	// 	);
	// });

	return (
		<div class="dm">
			<h2 class="dm__heading">
				<span>
					Direct messages <span class="dm__number">({users.length})</span>
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
					<button class="dm__button">
						<span>Nurs Asanov (Should I be able to text )</span>
					</button>
				</li>
				{/* {userComponents} */}
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
