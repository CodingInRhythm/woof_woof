/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_CHANNEL_MESSAGES = "set/CHANNEL_MESSAGES";

const ADD_CHANNEL_MESSAGE = "add/CHANNEL_MESSAGE";


/*************************** ACTIONS ***************************/
const setMessages = (channel_id, messages) => ({
    type: SET_CHANNEL_MESSAGES,
    channel_id,
    messages,
});

export const addMessage = (channel_id, message)=> ({
    type: ADD_CHANNEL_MESSAGE,
    channel_id,
    message
});

/*************************** THUNKS ***************************/
export const getChannelMessages = (channel_id) => async (dispatch) => {
    const response = await fetch(`/api/messages/channel/${channel_id}`);

    const data = await response.json();

    if (data.errors) {
        return;
    }

    dispatch(setMessages(channel_id, data['channel_messages']))
}


//Write thunk to add message to store so that other users not currently in
//room but with socket connection have message added to their store.  





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
            newState[action.channel_id]=[...newState[action.channel_id], action.message]
            return newState
        default:
            return state;
    }
}
