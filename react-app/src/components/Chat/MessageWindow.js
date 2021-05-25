import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { io } from "socket.io-client";
import { addMessage } from "../../store/channel_messages";

let socket;

const MessageWindow = ({room}) => {
  //STATE VARIABLES

  const dispatch = useDispatch()

  const [chatInput, setChatInput] = useState("");

  const [newMessages, setNewMessages] = useState([]);

  //REDUX
  const user = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state.channelMessages[room]);

  const sendChat = (e) => {

      e.preventDefault();
      // emit a message
      socket.emit("chat", { id: user.id, recipient_id: user.id===1 ? 2 : 1, message: chatInput, room:room });
      // clear the input field after the message is sent
      setChatInput("");
  };

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  useEffect(()=>{
    socket = io()
    socket.on('connect', ()=>{
      socket.emit('join', {room:room})
    })

    socket.on("chat", (chat) => {
        // when we recieve a chat, add it into our messages array in state
        console.log(chat)
        dispatch(addMessage(chat.channel_id, chat))
        // setNewMessages(messages=>[...messages, chat])
    })

    // return (()=>{
    //   socket.emit('leave', {room:room})
    //   socket.disconnect()
    // })
  },[room])

  return (
      <div>
        {messages?.map((message, ind) => (
          <div key={message.id}>{`${message.message}`}</div>
        ))}
        DUMMY TEXT
        {newMessages.map((message, ind) => (
          <div key={message.id}>{`${message.message}`}</div>
        ))}
        <form onSubmit={sendChat}>
            <input value={chatInput} onChange={updateChatInput} />
            <button type="submit">Send</button>
        </form>
      </div>
    );
};

export default MessageWindow;
