/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_CHANNEL = 'set/CHANNEL';
const ADD_CHANNEL = 'add/CHANNEL';

/*************************** ACTIONS ***************************/
const setChannels = channels => ({
	type: SET_CHANNEL,
	channels,
});

export const addChannel = channel => ({
	type: ADD_CHANNEL,
	channel,
});

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

export const addNewChannel = channel_obj => async dispatch => {
	const response = await fetch(`/api/channels/`, {
		method: 'POST',
		body: JSON.stringify(channel_obj),
		headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
		const channel = await response.json();
		console.log(channel);
		dispatch(addChannel(channel));
		return channel;
	} else {
		throw response;
	}
};
/*************************** REDUCER ***************************/

const initialState = {};

export default function channelReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_CHANNEL:
			newState = { ...state, ...action.channels };
			return newState;
		case ADD_CHANNEL:
			newState = { ...state };
			newState[action.channel.id] = action.channels;
			return newState;
		default:
			return state;
	}
}
