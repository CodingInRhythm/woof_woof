import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

let socket;

const MessageWindow = ({ messages, setMessages }) => {
  
useEffect(() => {
  // create websocket/connect
  socket = io("http://localhost:5000");

  socket.on("connect", (event) => {
    console.log("Hello Brent!");
    socket.emit("join");
  });
  socket.on("chat", (chat) => {
    console.log("making it?"); //FAIL
    // when we recieve a chat, add it into our messages array in state
    setMessages((messages) => [...messages, chat]);
  });
  // when component unmounts, disconnect
  return () => {
    socket.disconnect();
  };
}, []);

return (
    <div>
      {messages.map((message, ind) => (
        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
      ))}
      DUMMY TEXT
    </div>
  );
};

export default MessageWindow;
