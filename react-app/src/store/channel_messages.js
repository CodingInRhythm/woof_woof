/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_CHANNEL_MESSAGES = "set/CHANNEL_MESSAGES";

const ADD_CHANNEL_MESSAGE = "add/CHANNEL_MESSAGE";

const EDIT_CHANNEL_MESSAGE = "edit/CHANNEL_MESSAGE";

const DELETE_CHANNEL_MESSAGE = "delete/CHANNEL_MESSAGE";


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

const changeChannelMessage = (channel_id, message)=> ({
    type: ADD_CHANNEL_MESSAGE,
    channel_id,
    message
});

const removeChannelMessage = (channel_id, channel_message_id)=> ({
    type: DELETE_CHANNEL_MESSAGE,
    channel_id,
    channel_message_id
});

/*************************** THUNKS ***************************/
export const getChannelMessages = (channel_id) => async (dispatch) => {
    const response = await fetch(`/api/messages/channel/${channel_id}`);

    const data = await response.json();

    if (data.errors) {
        return;
    }

    dispatch(setChannelMessages(channel_id, data['channel_messages']))
}

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

    dispatch(changeChannelMessage(data['channel_message'].channel_id, data['channel_message']))
}

export const deleteChannelMessage = (channel_message_id) => async (dispatch) => {
    const response = await fetch(`/api/messages/channel/${channel_message_id}`,{
        method: 'DELETE'
    });

    const data = await response.json();

    if (data.errors) {
        return;
    }

    dispatch(removeChannelMessage(data['channel_id'], channel_message_id))
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
            newState[action.channel_id]=[...newState[action.channel_id], action.message]
            return newState
        case EDIT_CHANNEL_MESSAGE:
            newState = {...state}
            newState[action.channel_id]=newState[action.channel_id].map((message)=>{
                if(message.id===action.message.id){
                    return action.message
                }
                return message
            })
            return newState
        case DELETE_CHANNEL_MESSAGE:
            newState = {...state}
            newState[action.channel_id]=newState[action.channel_id].filter((message)=>{
                if(message.id!==action.channel_message_id){
                    return message
                }
            })
            return newState
        default:
            return state;
    }
}
