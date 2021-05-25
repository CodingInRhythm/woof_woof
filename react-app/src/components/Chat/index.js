/*************************** REACT IMPORTS ***************************/
import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import MessageWindow from './MessageWindow'


/*************************** OTHER FILE IMPORTS ***************************/
import {getChannelMessages} from '../../store/channel_messages'
import {getDirectMessages} from '../../store/direct_messages'

// outside of your component, initialize the socket variable
let socket;

/*************************** COMPONENTS ***************************/
const Chat = () => {


  const dispatch= useDispatch()

  const [room, setRoom] = useState('1')

  const userId = useSelector((state) => state.session.user.id)

  //FUNCTIONS

  //val 1 will either be channelId or userId
  const hashingRoom = (val1, recipientId) => {
    if (!recipientId) {
      return `Channel: ${val1}`
    } 
    else {
      return `DM${val1 < recipientId ? val1 : recipientId}${val1 > recipientId ? val1 : recipientId}`;
    }

  }

  const joinChat1 = async (e) => {
    e.preventDefault()
    dispatch(getChannelMessages(1)) //getChannelMessages fetches msgs from dB puts them in store 
    setRoom(hashingRoom(1)) // room == num will function in child component, MessageWindow
  }

  const joinChat2 = async (e) => {
    e.preventDefault();
    dispatch(getChannelMessages(2))
    setRoom(hashingRoom(2))

  };
  let recipientId;
  const joinDm = async (e) => {
    e.preventDefault()
    let recipientId = Number(e.target.id)
    console.log(e.target)
    dispatch(getDirectMessages(recipientId))
    setRoom(hashingRoom(userId, recipientId))
  }


  //USEFFECTS

  useEffect(async ()=>{
    let res = await fetch('/change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({channelid: 1})
    })

  },[])


  //RETURN STATEMENT
    //add conditional logic to check if user

  return (
    <>
      <form onSubmit={joinChat1}>
        <button>Chat 1</button>
      </form>
      <form onSubmit={joinChat2}>
        <button>Chat 2</button>
      </form>
      <form id="1" onSubmit={joinDm}>
        <button>User1</button>
      </form>
      <form id="2" onSubmit={joinDm}>
        <button>User2</button>
      </form>
      <div>
        <Route path="/:id">
          <MessageWindow recipientid={recipientId} room={room} />
        </Route>
      </div>
    </>
  );
};

export default Chat
