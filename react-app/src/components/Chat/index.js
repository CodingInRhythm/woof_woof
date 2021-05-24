// import the socket
import { io } from "socket.io-client";
import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

// outside of your component, initialize the socket variable
let socket;

const Chat = () => {

    console.log('Component mounts?') //SUCCEED

  //STATE VARIABLES
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  //REDUX
  const user = useSelector((state) => state.session.user);

  console.log('test user store??', user)  //SUCCESS

  //FUNCTIONS

    const sendChat = (e) => {
        console.log('event handler works?') //SUCCESS
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
        console.log(socket)
    socket.on("chat", (chat) => {
        console.log('making it?') //FAIL
       // when we recieve a chat, add it into our messages array in state
        setMessages((messages) => [...messages, chat]);
     });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);


  //RETURN STATEMENT
    //add conditional logic to check if user

  return (
      <>
        <div>
            {messages.map((message, ind) => (
                <div key={ind}>{`${message.user}: ${message.msg}`}</div>
            ))}
        </div>
        <form onSubmit={sendChat}>
            <input value={chatInput} onChange={updateChatInput} />
            <button type="submit">Send</button>
        </form>
    </>
  )
};

export default Chat