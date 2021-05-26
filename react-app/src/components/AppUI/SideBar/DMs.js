import React, {useState} from 'react';
// import React from 'react';
import './DMs.css';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDirectMessages } from '../../../store/direct_messages'
import MainInterface from '../MainInterface';

const DMPerson = ({recipient}) => {
	const dispatch = useDispatch()
	const history = useHistory()
	const [isClicked, setIsClicked] = useState(false)
	const handleClick = ()=> {
		if (!isClicked){
			dispatch(getDirectMessages(recipient.id))
			setIsClicked(true)
		}
		history.push(`/dm/${recipient.id}`)
	}
	
	return(
		<li class="dm__item">
		<button class="dm__button" id={`dm_${recipient.id}`} onClick={handleClick}>
			<span>{`${recipient.firstname} ${recipient.lastname}`}</span>
		</button>
	</li>
	);
}

const DMs = () => {
	const history = useHistory()

	// const user = useSelector(state => state.session.user);
	// const userId = user.id;
	
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

			
			//UseSelector grabs our conversations
	const conversations = useSelector(state => state.dm_users);
	let arr = []
	for (let i in conversations){
		arr.push(conversations[i])
	}
			//FUNCTIONS
		
	const newMessage = () => {
		console.log('here')
		history.push('/dms/all')
	}
		
	return (
		<div class="dm">
			<h2 class="dm__heading">
				<span>
					Direct messages <span class="dm__number">({arr.length})</span>
				</span>
			</h2>
			<ul class="dm__list">

				{arr?.map(conversation => <DMPerson recipient={conversation}/>)}
				{/* <li class="dm__item">
					<button class="dm__button dm__button--online">
					<span>Brent Arimoto</span>
					</button>
					</li>
					<li class="dm__item">
					<i class="fas fa-smile"></i>
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
				</li> */}
				{/* {userComponents} */}

				<li class="dm__item">
					<button onClick={newMessage} class="dm__add">
						<span class="dm__add--plussign">+</span>
						<span class="dm__add">Add teammates</span>
					</button>
				</li>
			</ul>
		</div>
	);
};
export default DMs;
