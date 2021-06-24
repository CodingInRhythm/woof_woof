/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_DMUSER = 'set/DMUSER';
const ADD_DMUSER = 'add/DMUSER';
const REMOVE_DMUSER = 'remove/DMUSER';
const RESET_DMUSER = 'reset/DMUSER';
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

const removeDMUser = userid => ({
	type: REMOVE_DMUSER,
	userid
})

export const resetDMUsers = () => ({
	type: RESET_DMUSER,
	}
)

/*************************** THUNKS ***************************/
export const getDMUsers = () => async dispatch => {
	const response = await fetch(`/api/dms/`);
	const data = await response.json();
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
	if (data.errors) {
		return
	}
	dispatch(addDMUser(data))
}

export const hideUser = (userObj) => async dispatch => {
	const response = await fetch(`/api/dms/${userObj.id}`, {
		method: "PUT",
		headers: {
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify({userObj})
	});
	const data = await response.json()
	if (data.errors) {
		return
	}
	dispatch(removeDMUser(userObj.id))
}

export const setOnlineStatusUser = (id, status) => async dispatch => {
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
		case RESET_DMUSER:
			return {...initialState}
		default:
			return state;
	}
}
