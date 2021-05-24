import React, { useEffect, useState } from 'react';
import './DMs.css';
import { NavLink } from 'react-router-dom';

const DMs = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch('/api/users/');
			const responseData = await response.json();
			setUsers(responseData.users);
		}
		fetchData();
	}, []);

	const userComponents = users.map(user => {
		return (
			<li key={user.id} className="dm__item">
				<NavLink to={`/users/${user.id}`} className="dm__button">
					{user.username}
				</NavLink>
			</li>
		);
	});

	return (
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
						<span>Rebecca Potter</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button dm__button--online">
						<span>Sam Daniel</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button">
						<span>Daniel Munoz</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button dm__button--online">
						<span>Milton Ward</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button">
						<span>Luella Hunt</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button dm__button--online">
						<span>Calvin Coleman</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button">
						<span>Lou Hudson</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button dm__button--online">
						<span>Walter Lopez</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button">
						<span>Travis Castro</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button dm__button--online">
						<span>Max Dawson</span>
					</button>
				</li>
				<li class="dm__item">
					<button class="dm__button">
						<span>Nurs Asanov (Should I be able to text )</span>
					</button>
				</li>
				{userComponents}
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
