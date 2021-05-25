/*************************** REACT IMPORTS ***************************/
import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import MessageWindow from './MessageWindow'


/*************************** OTHER FILE IMPORTS ***************************/
import {getChannelMessages} from '../../store/channel_messages'

// outside of your component, initialize the socket variable
let socket;

/*************************** COMPONENTS ***************************/
const Chat = () => {

  const dispatch= useDispatch()

  const [room, setRoom] = useState('1')

  //FUNCTIONS

  const roomHasher =() =>{

  }

  const joinChat1 = async (e) => {
    e.preventDefault()
    dispatch(getChannelMessages(1))
    setRoom('1')
  }

  const joinChat2 = async (e) => {
    e.preventDefault();
    dispatch(getChannelMessages(2))
    setRoom('2')
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
        <div>
          <Route path='/:id'>
            <MessageWindow room={room}/>
          </Route>
        </div>
    </>
  )
};

export default Chat