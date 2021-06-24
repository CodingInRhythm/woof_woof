import React, { useState } from "react";
import { useSelector} from 'react-redux'

let socket;

const MessageWindow = ({recipientid, room}) => {
  //STATE VARIABLES

  const [chatInput, setChatInput] = useState("");

  const newMessages = []

  //REDUX

  let slice;
  let roomNum;
  if (room.includes("Channel")) {
    roomNum = room.split(" ")[1];
    slice = 'channelMessages'
  } else {
    roomNum = recipientid
    slice = "directMessages"
  }

  const user = useSelector((state) => state.session.user);
  const messages = useSelector((state) => state[slice][roomNum]) //grab msgs from store


  const sendChat = (e) => {

      e.preventDefault();
      // emit a message
      socket.emit("chat", {id: user.id, recipient_id: user.id===1 ? 2 : 1, message: chatInput, room:room });
      // clear the input field after the message is sent
      setChatInput("");
  };

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };


  return (
      <div>
        {messages?.map((message, ind) => (
          <div key={message.id}>{`${message.message}`}</div>
        ))}
        _______________________________________________
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
