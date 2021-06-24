/*************************** REACT IMPORTS ***************************/
import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import MessageWindow from './MessageWindow'
import "./chat.css"


/*************************** OTHER FILE IMPORTS ***************************/
import {getChannelMessages} from '../../store/channel_messages'
import {getDirectMessages} from '../../store/direct_messages'

// outside of your component, initialize the socket variable

/*************************** COMPONENTS ***************************/
const Chat = () => {


  const dispatch= useDispatch()
  const channels = useSelector(state => state.channelMessages)

  const [room, setRoom] = useState('1')

  const [onLoad, setOnLoad] = useState(false)
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
    if (!channels[1]){
      dispatch(getChannelMessages(1))
    }
    document.getElementById("chat1").classList.add("red-chat")
    document.getElementById("chat2").classList.remove("red-chat")
    document.getElementById("chat1_notice").classList.add("hidden")
    setRoom(hashingRoom(1)) 
  }

  const joinChat2 = (e) => {
    e.preventDefault();
    if (!channels[2]){
      (async ()=>{
        await dispatch(getChannelMessages(2))
      })()
    }
    document.getElementById("chat2").classList.add("red-chat")
    document.getElementById("chat1").classList.remove("red-chat")
    document.getElementById("chat2_notice").classList.add("hidden")
    setRoom(hashingRoom(2))

  };

  const joinDm = (e) => {
    e.preventDefault()
    let recipientId = Number(e.target.id)
    (async ()=>{
      await dispatch(getDirectMessages(recipientId))
    })()
    setRoom(hashingRoom(userId, recipientId))
  }

  useEffect(() => {
    dispatch(getChannelMessages(1))
    dispatch(getChannelMessages(2))
  }, [dispatch])
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

  useEffect(() => {
    if (room === "2" && onLoad){
      document.getElementById("chat1_notice").classList.remove("hidden")
    }
    setOnLoad(true)
  },[channels[1]])

  useEffect(() => {
    if (room === "1" && onLoad){
      document.getElementById("chat2_notice").classList.remove("hidden")
    }
    setOnLoad(true)
  },[channels[2]])


  return (
      <>
        <form onSubmit={joinChat1}>
          <button id="chat1">Chat 1</button>
          <h2 id="chat1_notice" className="hidden notice">New Message!</h2>
        </form>
        <form onSubmit={joinChat2}>
          <button id="chat2">Chat 2</button>
          <h2 id="chat2_notice" className="hidden notice">New Message!</h2>
        </form>
        <form id="1" onSubmit={joinDm}>
          <button>User1</button>
        </form>
        <form id="2" onSubmit={joinDm}>
          <button>User2</button>
        </form>
        <div>
          <Route path='/:id'>
            <MessageWindow room={room}/>
          </Route>
        </div>
    </>
  );
};

export default Chat
