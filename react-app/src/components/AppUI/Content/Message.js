/*************************** REACT IMPORTS ***************************/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill'; // ES6

import {editChannelMessage, deleteChannelMessage} from '../../../store/channel_messages'
import ava from '../../../images/ava.png';

/*************************** HELPER COMPONENT ***************************/
const EditDelete = ({editOn, setEditOn, deleteOn, setDeleteOn, msg, date, modules, formats}) =>{
    const dispatch = useDispatch()
    const [currentMessage, setCurrentMessage] = useState(msg.message)

    const textInput = useRef(null)

    const handleEdit = (e) => {
        e.preventDefault();
        let textField = textInput.current.state.value
        if(textField && textField !== "<br>"){
            let editor = textInput.current.getEditor()
            let text= editor.getText()
            if (msg.recipient_id){

            } else if (msg.channel_id && text!==currentMessage){
                dispatch(editChannelMessage(msg.id, text))
            }
            setEditOn(false)
        }
    }

    const handleDelete = ()=>{
        if (msg.recipient_id){

        } else{
            dispatch(deleteChannelMessage(msg.id))
        }
    }

    if (editOn){
        return(
            <>
                <ReactQuill
                    modules={modules}
                    formats={formats}
                    value={currentMessage}
                    ref={textInput}
                    inputclass="main__chat-textarea"
                >
                    <div className="my-editing-area" />
                </ReactQuill>
                <button onClick={()=>setEditOn(false)}>Cancel</button>
                <button onClick={handleEdit}>Save Changes</button>
            </>
        )
    } else if(deleteOn){
        return (
            <>
                <h2>Are you sure you want to delete message: </h2>
                <h2>{msg.message}</h2>
                <button onClick={()=>setDeleteOn(false)}>Cancel</button>
                <button onClick={handleDelete}>Confirm Delete</button>
            </>
        )
    } else {
        return(
            <>
                <span className="chat__username">{msg.user.firstname + ' ' + msg.user.lastname}</span>
                <span className="chat__date">{date}</span>
                <p className="chat__text">{currentMessage}</p>
            </>
        )
    }
}

/*************************** MAIN COMPONENT ***************************/
const Message = ({ msg, modules, formats}) => {

    const [editOn, setEditOn]=useState(false)
    const [deleteOn, setDeleteOn]=useState(false)
    const user = useSelector(state=> state.session.user)

	let date = new Date(msg?.created_at).toDateString() + ' ' + new Date(msg?.created_at).toLocaleTimeString();

    const isUser = msg.sender_id===user.id || msg.user_id===user.id


    return (
        <div className="main__chat-item">
            <div className="chat__image-container">
                <img src={msg.user?.profile_photo ? msg.user.profile_photo : ava} alt="profile-photo" className="chat__avatar"></img>
            </div>
            <div className="chat__other-info">
                <EditDelete editOn={editOn} setEditOn={setEditOn} deleteOn={deleteOn} setDeleteOn={setDeleteOn} msg={msg} date={date} modules={modules} formats={formats}/>
            </div>
            {!editOn && isUser && <div className="chat__extra-options">
                <div className="chat__edit">
                    <button onClick={()=>setEditOn(true)}><i className="fas fa-pencil-alt"></i></button>
                </div>
                <div className="chat__delete">
                    <button onClick={()=>setDeleteOn(true)}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>}
        </div>
    );
};

/*************************** EXPORT ***************************/
export default Message;
