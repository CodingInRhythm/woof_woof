/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_CHANNEL = 'set/CHANNEL';
const ADD_CHANNEL = 'add/CHANNEL';
const EDIT_CHANNEL = 'edit/CHANNEL';
const DELETE_CHANNEL = 'delete/CHANNEL';
const RESET_CHANNEL = 'reset/CHANNEL';

/*************************** ACTIONS ***************************/
const setChannels = channels => ({
	type: SET_CHANNEL,
	channels,
});

export const addChannel = channel => ({
	type: ADD_CHANNEL,
	channel,
});

export const editExistingChannel = channel => ({
	type: EDIT_CHANNEL,
	channel,
});

export const removeChannel = channel => ({
	type: DELETE_CHANNEL,
	channel,
});

export const resetChannels = () => ({
	type: RESET_CHANNEL,
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
		dispatch(addChannel(channel.channel));
		return channel.channel;
	} else {
		throw response;
	}
};

export const joinChannel = channel_obj => async dispatch => {
	const response = await fetch(`/api/channels/join`, {
		method: 'POST',
		body: JSON.stringify(channel_obj),
		headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
		const channel = await response.json();
		dispatch(addChannel(channel.channel));

		return channel;
	} else {
		throw response;
	}
};

export const editChannel = (channel_id, name) => async dispatch => {
	const response = await fetch(`/api/channels/${channel_id}`, {
		method: 'PUT',
		body: JSON.stringify(name),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		const channel = await response.json();
		dispatch(editExistingChannel(channel.channel));
		return channel;
	} else {
		throw response;
	}
};

export const deleteChannel = channel_id => async dispatch => {
	const response = await fetch(`/api/channels/${channel_id}`, {
		method: 'POST',
	});

	if (response.ok) {
		const channel = await response.json();
		dispatch(removeChannel(channel.channel));
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
			newState[action.channel.id] = action.channel;
			return newState;
		case EDIT_CHANNEL:
			newState = { ...state };
			newState[action.channel.id] = action.channel;
			return newState;
		case DELETE_CHANNEL:
			newState = { ...state };
			delete newState[action.channel.id];
			return newState;
        case RESET_CHANNEL:
            return {...initialState}
		default:
			return state;
	}
}
