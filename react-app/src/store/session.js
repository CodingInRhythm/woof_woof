/*************************** OTHER FILE IMPORTS ***************************/
import {resetChannelMessages} from './channel_messages'
import {resetChannels} from './channels'
import {resetDirectMessages} from './direct_messages'
import {resetDMUsers} from './dm_people'

/*************************** TYPES ***************************/
// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

/*************************** ACTIONS ***************************/
const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

const removeUser = () => ({
    type: REMOVE_USER,
})

const initialState = { user: null };

/*************************** THUNKS ***************************/
export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/',{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }

    dispatch(setUser(data))
  }

export const login = (credential, password) => async (dispatch)  => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  if (data.errors) {
      return data;
  }

  dispatch(setUser(data))
  return data.id;
}

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });

  const data = await response.json();
  dispatch(removeUser());
  dispatch(resetChannelMessages())
  dispatch(resetChannels())
  dispatch(resetDirectMessages())
  dispatch(resetDMUsers())
};


export const signUp = (username, firstname, lastname, email, profile_image, password) => async (dispatch)  => {

  const formData = new FormData();
  formData.append('username', username)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('firstname', firstname)
  formData.append('lastname', lastname)
  formData.append("profile_image", profile_image);

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  if (data.errors) {
      return data;
  }

  dispatch(setUser(data))
  return {};
}


export const editUser = ({id, username, firstname, lastname, email, profile_image}) => async (dispatch)  => {

  const formData = new FormData();
  formData.append('username', username)
  formData.append('email', email)
  formData.append('firstname', firstname)
  formData.append('lastname', lastname)
  formData.append("profile_image", profile_image);


  const response = await fetch(`/api/auth/${id}/`, {
    method: "PUT",
    body: formData,
  });

  const data = await response.json();

  if (data.errors) {
      return data;
  }

  dispatch(setUser(data))
  return data;
}




export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        default:
            return state;
    }
}
