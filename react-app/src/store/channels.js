/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_CHANNEL = 'set/CHANNEL';
const ADD_CHANNEL = 'add/CHANNEL';

/*************************** ACTIONS ***************************/
const setChannels = channels => ({
	type: SET_CHANNEL,
	channels,
});

// export const addChannels = (channels) => ({
// 	type: ADD_CHANNEL_MESSAGE,
// 	channels
// });

/*************************** THUNKS ***************************/
export const getChannels = () => async dispatch => {
	const response = await fetch(`/api/channels/`);
	const data = await response.json();
	if (data.errors) {
		return;
	}

	let currentUserChannels = {};
	data.channels.forEach(channel => {
		currentUserChannels[channel.id] = channel;
	});
	dispatch(setChannels(currentUserChannels));
};

/*************************** REDUCER ***************************/

const initialState = {};

export default function channelReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_CHANNEL:
			newState = { ...state, ...action.channels };
			return newState;
		// case ADD_CHANNEL:
		// 	return newState;
		default:
			return state;
	}
}
