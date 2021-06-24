/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_CHANNEL_MESSAGES = 'set/CHANNEL_MESSAGES';

const ADD_CHANNEL_MESSAGE = 'add/CHANNEL_MESSAGES'

const DELETE_CHANNEL_MESSAGE = "delete/CHANNEL_MESSAGE";

const RESET_CHANNEL_MESSAGE = "reset/CHANNEL_MESSAGE";


/*************************** ACTIONS ***************************/
const setChannelMessages = (channel_id, messages) => ({
    type: SET_CHANNEL_MESSAGES,
    channel_id,
    messages,
});

export const addChannelMessage = (channel_id, message)=> ({
    type: ADD_CHANNEL_MESSAGE,
    channel_id,
    message
});

const removeChannelMessage = (channel_id, channel_message_id)=> ({
    type: DELETE_CHANNEL_MESSAGE,
    channel_id,
    channel_message_id
});

export const resetChannelMessages = ()=> ({
    type: RESET_CHANNEL_MESSAGE,
});


/*************************** THUNKS ***************************/
export const getChannelMessages = channel_id => async dispatch => {
	const response = await fetch(`/api/messages/channel/${channel_id}`);

	const data = await response.json();
	if (data.errors) {
		return;
	}

    const obj = {}

    data.channel_messages.forEach(message=>{
        obj[message.id]=message
    })

	dispatch(setChannelMessages(channel_id, obj))
};

//Write thunk to add message to store so that other users not currently in
//room but with socket connection have message added to their store.

export const editChannelMessage = (channel_message_id, message) => async (dispatch) => {
    const response = await fetch(`/api/messages/channel/${channel_message_id}`,{
        method: 'PUT',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({message}),
    });

    const data = await response.json();

    if (data.errors) {
        return;
    }

    dispatch(removeChannelMessage(data.channel_message.channel_id, data.channel_message.id))
    dispatch(addChannelMessage(data.channel_message.channel_id, data.channel_message))
}

export const deleteChannelMessage = (channel_message_id) => async (dispatch) => {
    const response = await fetch(`/api/messages/channel/${channel_message_id}`,{
        method: 'DELETE'
    });

    const data = await response.json();

    if (data.errors) {
        return;
    }

    dispatch(removeChannelMessage(data.channel_message.channel_id, channel_message_id))
}


/*************************** REDUCER ***************************/

const initialState = {};

export default function channelMessageReducer(state=initialState, action) {
    let newState;
    switch (action.type) {
        case SET_CHANNEL_MESSAGES:
            newState = {...state}
            newState[action.channel_id]=action.messages
            return newState
        case ADD_CHANNEL_MESSAGE:
            newState = {...state}
            newState[action.channel_id]={...newState[action.channel_id]}
            newState[action.channel_id][action.message.id]=action.message
            return newState
        case DELETE_CHANNEL_MESSAGE:
            newState = {...state}
            delete newState[action.channel_id][action.channel_message_id]
            return newState
        case RESET_CHANNEL_MESSAGE:
            return {...initialState}
        default:
            return state;
    }
}
