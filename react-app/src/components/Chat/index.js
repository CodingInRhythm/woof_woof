// import the socket
import { io } from "socket.io-client";
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import MessageWindow from './MessageWindow'
// outside of your component, initialize the socket variable
let socket;

const Chat = () => {

  

  //STATE VARIABLES
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  //REDUX
  const user = useSelector((state) => state.session.user);



  //FUNCTIONS

    const joinChat1 = async (e) => {
      e.preventDefault()
      setMessages([{user: "Alex", msg: "Hello"}])
      let res = await fetch('/change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({channelid: 1})
      })
      console.log(res.json())
    }
       const joinChat2 = async (e) => {
         e.preventDefault();
          setMessages([{user: "Brent", msg: "Hello2"}]);
         let res = await fetch("/change", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({ channelid: 2 }),
         });
         console.log(res.json());
       };


    const sendChat = (e) => {
       
        e.preventDefault();
        // emit a message
        socket.emit("chat", { user: user.username, msg: chatInput });
        // clear the input field after the message is sent
        setChatInput("");
  };

    const updateChatInput = (e) => {
      setChatInput(e.target.value);
    };
  
  //USEFFECTS
  
    useEffect(() => {
  // create websocket/connect
      socket = io("http://localhost:5000");
      return () => {
        socket.disconnect();
      };
    }, [])


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
          <MessageWindow setMessages={setMessages} messages={messages}/>
        </div>
        <form onSubmit={sendChat}>
            <input value={chatInput} onChange={updateChatInput} />
            <button type="submit">Send</button>
        </form>
    </>
  )
};

export default Chat