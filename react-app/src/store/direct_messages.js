/*************************** OTHER FILE IMPORTS ***************************/

/*************************** TYPES ***************************/
const SET_DIRECT_MESSAGES = "set/DIRECT_MESSAGES";

const ADD_DIRECT_MESSAGE = "add/DIRECT_MESSAGE";

/*************************** ACTIONS ***************************/

//Action to set the messages from a particular recipient,
//used with getChannelMessages thunk.

const setMessages = (recipient_id, messages) => ({
  type: SET_DIRECT_MESSAGES,
  recipient_id,
  messages,
});

export const addMessage = (recipient_id, message) => ({
  type: ADD_DIRECT_MESSAGE,
  recipient_id,
  message,
});

/*************************** THUNKS ***************************/
export const getDirectMessages = (recipient_id) => async (dispatch) => {
  const response = await fetch(`/api/messages/dm/${recipient_id}`);

  const data = await response.json();

  if (data.errors) {
    return;
  }

  dispatch(setMessages(recipient_id, data["direct_messages"]));
};

//Write thunk to add message to store so that other users not currently in
//room but with socket connection have message added to their store.

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
      newState = { ...state };
      newState[action.recipient_id] = [
        ...newState[action.recipient_id],
        action.message,
      ];
      return newState;
    default:
      return state;
  }
}
