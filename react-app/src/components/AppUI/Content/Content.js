import React, { useEffect, useState, useRef } from 'react';
import {Link} from 'react-router-dom'
import './Content.css';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages, addMessage as addChannelMessage } from '../../../store/channel_messages';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { getDirectMessages } from '../../../store/direct_messages';
import { addDMUser, getDMUser } from '../../../store/dm_people'


const Content = ({ isAddDM, room, setRoom, socket }) => {

	let modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			[{ font: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link', 'image'],
			['clean'],
		],
	};
	let formats = [
		'header',
		'bold',
		'italic',
		'font',
		'underline',
		'strike',
		'blockquote',
		'code-block',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
	];



	//val 1 will either be channelId or userId
	const hashingRoom = (val1, recipientId) => {
		if (!recipientId) {
      return `Channel: ${val1}`
		}
		else {
			return `DM${val1 < recipientId ? val1 : recipientId}${val1 > recipientId ? val1 : recipientId}`;
		}
	}

  const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const channel_messages = useSelector(state => state.channelMessages);
	const direct_messages = useSelector(state => state.directMessages);
	const dms = useSelector(state => state.dm_users)
	const userId = useSelector((state) => state.session.user.id)


	const history = useHistory();
	 	 

	const [searchParam, setSearchParam] = useState('')
	const [matchingUsers, setMatchingUsers] = useState([])
	
	const textInput = useRef(null)
  
	let slice;
	let roomNum;

	//Check if path is for channel, dm or dm/all which will list dms and have
	//search functionality
	if (location.pathname.includes("channel")) {
		roomNum = room.split(" ")[1];
		slice = "channelMessages";
		setRoom(hashingRoom(id));
	}
	else if (location.pathname === "/dms/all") {
		slice = "dm_users"
	}
	else if (location.pathname.includes("dm")) {
		roomNum = id
		setRoom(hashingRoom(userId, id))
		slice = "directMessages"
	}
    let messages = useSelector(state => state[slice])

  let textField;

  //Handle Send Message
	const sendMessage = (e) => {
		e.preventDefault();
		textField = textInput.current.state.value

		if(textField && textField !== "<br>"){
			let editor = textInput.current.getEditor()
			let text= editor.getText()
			editor.deleteText(0, text.length)

			if (location.pathname.includes("dm")){
				console.log("before dm")
				if (!(id in dms)){
					console.log(id)
					console.log(dms)
					dispatch(getDMUser(id))
				}
				socket.emit("dm", {sender_id:userId, recipient_id: id, message:text, room:hashingRoom(userId, id)})
			} else{
				socket.emit("chat", {room:id, id:userId, message:text})
			}
			console.log(text)
		}

	}

	//  USEEFFECTS

	useEffect(() => {
		if (location.pathname.includes("channel")) {
			slice = 'channelMessages'
			setRoom(hashingRoom(id))
		} else {
			setRoom(hashingRoom(userId, id))
			slice = "directMessages"
		}
		if (!channel_messages[id] && slice === "channelMessages") {
			dispatch(getChannelMessages(id));
		}
		if (!direct_messages[id] && slice === "directMessages") {
			dispatch(getDirectMessages(id));
		}
	}, [room, dispatch, id]);


	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch('/api/users/')
			const data = await res.json()
		
			setMatchingUsers(data.users.filter((user) => {
				return user.firstname?.toLowerCase().indexOf(searchParam) === 0
			}))
		
		}
		if (searchParam) fetchUsers()
	}, [searchParam])



	let messageItem;



	if (isAddDM) {
		messageItem = Object.keys(messages).map(msg => {
			return (
        <Link to={`/dm/${messages[msg].id}`}>
          <div class="main__chat-item">
            <div class="chat__image-container">
              <img
                src={messages[msg].profile_photo}
                alt="profile-photo"
                class="chat__avatar"
              ></img>
            </div>
            <div class="chat__other-info">
              {messages[msg].firstname + " " + messages[msg].lastname}
            </div>
          </div>
        </Link>
      );	
		})
	}
	

	//FUNCTIONS//

	const handleSubmit = (e) => {
		e.preventDefault()
		
		console.log(e.target.id)
		/*need logic to check if user exits in dm store.
		If it does, we need to link to that users DMs.  
		*/
	
		
		history.push(`/dm/${e.target.id}`)
	
 
	}
	console.log(matchingUsers)

	return (
    <div class="main">
      <header class="main__header">
        <div class="main__channel-info">
          {isAddDM ? (
            <div>
              <h1 class="main__h3">All Direct Messages</h1>
            </div>
          ) : (
            <h1 class="main__h3">#2021-01-group02-juice-and-the-thunks</h1>
          )}
        </div>
        <div class="main__channel-members">
          <div>
            <i class="fas fa-user-friends"></i>{" "}
            <span class="main_channel-members-h3">View Members</span>
          </div>
          <div>
            <i class="fas fa-user-plus"></i>{" "}
            <span class="main_channel-members-h3">Add Members</span>
          </div>
        </div>
      </header>
      <div class="main__content">
        <div>
          {isAddDM ? (
            <>
              <form>
                <input
                  type="text"
                  name="searchParam"
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
                  placeholder="@somebody"
                />
              </form>
              {matchingUsers.length && (
                <ul>
                  {matchingUsers.map((user, index) => {
                    return (
                      <li>
                        <form id={user.id} onSubmit={handleSubmit}>
                          <button type="submit">{user.firstname}</button>
                        </form>
                      </li>
                    );
                  })}
				</ul>
              )}
              <section class="main__chat">{messageItem}</section>
            </>
          ) : (
            <>
          <section class="main__chat">
					  {messages && messages[id] && Object.entries(messages[id])?.map(([id,msg]) => (
						<Message key={id} msg={msg} modules={modules} formats={formats}/>
					))}
				</section>
				<section class="main__chat-textarea">
		<form onSubmit={sendMessage}>
			<ReactQuill
			// placeholder={`Message #${messages[id]?.channel?.name}`}
			modules={modules}
			formats={formats}
			inputClass="main__chat-textarea"
			id="input_field"
			ref={textInput}
			// onChange={handleChange}
			>
			<div className="my-editing-area"></div>
			</ReactQuill>
			<button className="main__chat-send" type="submit">
			<i class="fas fa-paper-plane"></i>
			</button>
		</form>
				</section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


export default Content;
