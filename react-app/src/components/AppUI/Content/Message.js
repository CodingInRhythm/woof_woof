/*************************** REACT IMPORTS ***************************/
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'; // ES6

import {editChannelMessage, deleteChannelMessage} from '../../../store/channel_messages'
import {editDirectMessage, deleteDirectMessage} from '../../../store/direct_messages'
import UserProfileModal from '../UserProfile/UserProfileModal'

/*************************** HELPER COMPONENT ***************************/
const EditDelete = ({editOn, setEditOn, deleteOn, setDeleteOn, msg, date, modules, formats}) =>{
    const dispatch = useDispatch()
    const [currentMessage] = useState(msg.message)

    const textInput = useRef(null)

    const handleEdit = (e) => {
        e.preventDefault();
        let textField = textInput.current.state.value
        if(textField && textField !== "<br>"){
			let text = textField.slice(0, 2) + " class='chat__text' " + textField.slice(2)
            if (msg.recipient_id && text!==currentMessage){
                dispatch(editDirectMessage(msg.id, text))
            } else if (msg.channel_id && text!==currentMessage){
                dispatch(editChannelMessage(msg.id, text))
            }
        }
    }

    const handleDelete = ()=>{
        if (msg.recipient_id){
            dispatch(deleteDirectMessage(msg.id))
        } else{
            dispatch(deleteChannelMessage(msg.id))
        }
    }

    if (editOn){
        return(
            <div className="chat__other-info-edit">
                <ReactQuill
                    className="chat__quill"
                    modules={modules}
                    formats={formats}
                    value={currentMessage}
                    ref={textInput}
                >
                    <div className="my-editing-area" />
                </ReactQuill>
                <button className="chat__other-info-cancel" onClick={()=>setEditOn(false)}>Cancel</button>
                <button className="chat__other-info-confirm"  onClick={handleEdit}><i className="fas fa-check"></i> Save Changes</button>
            </div>
        )
    } else if(deleteOn){
        return (
            <div className="chat__other-info-delete">
                <h2 className="chat__other-info-delete-alert">Message will be permanently deleted. Are you sure?</h2>
                <div dangerouslySetInnerHTML={{ __html: currentMessage }}></div>
                <button className="chat__other-info-cancel" onClick={()=>setDeleteOn(false)}>Cancel</button>
                <button className="chat__other-info-confirm" onClick={handleDelete}>Confirm Delete</button>
            </div>
        )
    } else {
        return(
            <div className="chat__other-info">
                <div className="chat__other-header">
                    <Link className="chat__username" to={`/dm/${msg.user.id}`}>{msg.user.firstname + ' ' + msg.user.lastname}</Link>
                    <span className="chat__date">{date}</span>
                </div>
                <div className="chat__other-text">
					<div dangerouslySetInnerHTML={{ __html: currentMessage }}></div>
                </div>
            </div>
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

    useEffect(()=>{
        setEditOn(false)
    },[msg])


    return (
        <div className={editOn || deleteOn ? "main__chat-item-edit-delete" : "main__chat-item"}>
            <div className="chat__image-container">
                <UserProfileModal profileUser={msg.user} alt="profile-photo"/>
            </div>
            <EditDelete editOn={editOn} setEditOn={setEditOn} deleteOn={deleteOn} setDeleteOn={setDeleteOn} msg={msg} date={date} modules={modules} formats={formats}/>
            {!editOn && isUser && <div className="chat__extra-options">
                <div className="chat__edit">
                    <button className="chat_edit-btn" onClick={()=>setEditOn(true)}><i className="fas fa-pencil-alt"></i></button>
                </div>
                <div className="chat__delete">
                    <button className="chat__delete-btn" onClick={()=>setDeleteOn(true)}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>}
        </div>
    );
};

/*************************** EXPORT ***************************/
export default Message;
