/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_DMUSER = 'set/DMUSER';
const ADD_DMUSER = 'add/DMUSER';
/*************************** ACTIONS ***************************/
const setDMUser = dm_users => ({
	type: SET_DMUSER,
	dm_users,
});

export const addDMUser = user => ({
	type: ADD_DMUSER,
	user
	}
)

/*************************** THUNKS ***************************/
export const getDMUsers = () => async dispatch => {
	const response = await fetch(`/api/dms/`);
	const data = await response.json();
	console.log('****************************');
	console.log(data);
	console.log('****************************');
	if (data.errors) {
		return;
	}

	let currentUserDMs = {};
	data.dm_people.forEach(dmuser => {
		currentUserDMs[dmuser.id] = dmuser;
	});
	dispatch(setDMUser(currentUserDMs));
};

export const getDMUser = (id) => async dispatch => {
	const response = await fetch(`/api/users/${id}`);
	const data = await response.json()
	console.log(data)
	if (data.errors) {
		return
	}
	dispatch(addDMUser(data))
}

export const setOnlineStatusUser = (id, status) => async dispatch => {
	// console.log("setting online status")
	const response = await fetch(`/api/users/online/${id}`, {
		method:'PUT',
		headers:{
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({status}),
	});
}

/*************************** REDUCER ***************************/

const initialState = {};

export default function dmuserReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_DMUSER:
			newState = { ...state, ...action.dm_users };
			return newState;
		case ADD_DMUSER:
			newState = {...state}
			newState[action.user.id] = action.user
			return newState
		default:
			return state;
	}
}
