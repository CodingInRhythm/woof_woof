/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_DIRECT_MESSAGES = "set/DIRECT_MESSAGES";

const ADD_DIRECT_MESSAGE = "add/DIRECT_MESSAGE";

const DELETE_DIRECT_MESSAGE = "delete/DIRECT_MESSAGE";

const RESET_DIRECT_MESSAGE = "reset/DIRECT_MESSAGE";

/*************************** ACTIONS ***************************/

//Action to set the messages from a particular recipient,
//used with getChannelMessages thunk.

const setDirectMessages = (recipient_id, messages) => ({
  type: SET_DIRECT_MESSAGES,
  recipient_id,
  messages,
});

export const addDirectMessage = (recipient_id, message) => ({
  type: ADD_DIRECT_MESSAGE,
  recipient_id,
  message,
});

const removeDirectMessage = (recipient_id, direct_message_id)=> ({
    type: DELETE_DIRECT_MESSAGE,
    recipient_id,
    direct_message_id
});

export const resetDirectMessages = ()=> ({
    type: RESET_DIRECT_MESSAGE,
});


/*************************** THUNKS ***************************/
export const getDirectMessages = (recipient_id) => async (dispatch) => {
  const response = await fetch(`/api/messages/dm/${recipient_id}`);

  const data = await response.json();

  if (data.errors) {
    return;
  }

  const obj = {}

  data.direct_messages.forEach(message=>{
      obj[message.id]=message
  })

  dispatch(setDirectMessages(recipient_id, obj));
};

//Write thunk to add message to store so that other users not currently in
//room but with socket connection have message added to their store.

export const editDirectMessage = (recipient_id, message) => async (dispatch) => {
  const response = await fetch(`/api/messages/dm/${recipient_id}`,{
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


  dispatch(removeDirectMessage(data.direct_message.recipient_id, data.direct_message.id))
  dispatch(addDirectMessage(data.direct_message.recipient_id, data.direct_message))
}

export const deleteDirectMessage = (recipient_id) => async (dispatch) => {
  const response = await fetch(`/api/messages/dm/${recipient_id}`,{
      method: 'DELETE'
  });

  const data = await response.json();

  if (data.errors) {
      return;
  }

  dispatch(removeDirectMessage(data.direct_message.recipient_id, recipient_id))
}

/*************************** REDUCER ***************************/

const initialState = {};

export default function directMessageReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_DIRECT_MESSAGES:
      newState = { ...state };
      newState[action.recipient_id] = action.messages;
      return newState;
    case ADD_DIRECT_MESSAGE:
      newState = {...state}
      newState[action.recipient_id]={...newState[action.recipient_id]}
      newState[action.recipient_id][action.message.id]=action.message
      return newState;
    case DELETE_DIRECT_MESSAGE:
      newState = {...state}
      delete newState[action.recipient_id][action.direct_message_id]
      return newState
    case RESET_DIRECT_MESSAGE:
      return {...initialState}
    default:
      return state;
  }
}
