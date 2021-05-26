import React, { useEffect, useState } from 'react';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6


const EditMessage = ({editOn, setEditOn, msg, date, modules, formats}) =>{

    let [currentMessage, setCurrentMessage] = useState(msg.message)

    const handleEdit = ()=>{
        if (msg.recipient_id){

        } else{

        }
    }


    if (!editOn){
        return(
            <>
                <span className="chat__username">{msg.user.firstname + ' ' + msg.user.lastname}</span>
                <span className="chat__date">{date}</span>
                <p className="chat__text">{currentMessage}</p>
            </>
        )
    } else {
        return(
            <>
                <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={currentMessage}
                    inputclass="main__chat-textarea"
                >
                    <div className="my-editing-area" />
                </ReactQuill>
                <button onClick={()=>setEditOn(false)}>Cancel</button>
                <button onClick={handleEdit}>Save Changes</button>
            </>
        )
    }
}

const Message = ({ msg, modules, formats}) => {

    const [editOn, setEditOn]=useState(false)

	let date = new Date(msg?.created_at).toDateString() + ' ' + new Date(msg?.created_at).toLocaleTimeString();


    return (
        <div className="main__chat-item">
            <div className="chat__image-container">
                <img src={msg.user?.profile_photo ? msg.user.profile_photo : ava} alt="profile-photo" className="chat__avatar"></img>
            </div>
            <div className="chat__other-info">
                <EditMessage editOn={editOn} setEditOn={setEditOn} msg={msg} date={date} modules={modules} formats={formats}/>
            </div>
            {!editOn && <div className="chat__extra-options">
                <div className="chat__edit">
                    <button onClick={()=>setEditOn(true)}><i className="fas fa-pencil-alt"></i></button>
                </div>
                <div className="chat__delete">
                    <button><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>}
        </div>
    );
};

export default Message;
