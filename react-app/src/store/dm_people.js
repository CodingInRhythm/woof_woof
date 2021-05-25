/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_DMUSER = 'set/DMUSER';

/*************************** ACTIONS ***************************/
const setDMUser = dm_users => ({
	type: SET_DMUSER,
	dm_users,
});

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
	data.dm_users.forEach(dmuser => {
		currentUserDMs[dmuser.id] = dmuser;
	});
	dispatch(setDMUser(currentUserDMs));
};

/*************************** REDUCER ***************************/

const initialState = {};

export default function dmuserReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_DMUSER:
			newState = { ...state, ...action.dm_users };
			return newState;
		default:
			return state;
	}
}
