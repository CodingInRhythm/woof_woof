/*************************** REACT IMPORTS ***************************/
import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import MessageWindow from './MessageWindow'
import "./chat.css"


/*************************** OTHER FILE IMPORTS ***************************/
import {getChannelMessages} from '../../store/channel_messages'

// outside of your component, initialize the socket variable
let socket;

/*************************** COMPONENTS ***************************/
const Chat = () => {

  const dispatch= useDispatch()
  const channels = useSelector(state => state.channelMessages)

  const [room, setRoom] = useState('1')

  const [onLoad, setOnLoad] = useState(false)

  //FUNCTIONS

  const joinChat1 = async (e) => {
    e.preventDefault()
    if (!channels[1]){
      dispatch(getChannelMessages(1))
    }
    setRoom('1')
    document.getElementById("chat1").classList.add("red-chat")
    document.getElementById("chat2").classList.remove("red-chat")
    document.getElementById("chat1_notice").classList.add("hidden")
  }

  const joinChat2 = async (e) => {
    e.preventDefault();
    if (!channels[2]){
      dispatch(getChannelMessages(2))
    }
    setRoom('2')
    document.getElementById("chat2").classList.add("red-chat")
    document.getElementById("chat1").classList.remove("red-chat")
    document.getElementById("chat2_notice").classList.add("hidden")
  };

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

  //RETURN STATEMENT
    //add conditional logic to check if user

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
        <div>
          <Route path='/:id'>
            <MessageWindow room={room}/>
          </Route>
        </div>
    </>
  )
};

export default Chat