import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Content.css';
import ava from '../../../images/ava.png';
import ReactQuill from 'react-quill'; // ES6
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { getChannelMessages, addMessage as addChannelMessage } from '../../../store/channel_messages';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { getDirectMessages } from '../../../store/direct_messages';
import { addDMUser, getDMUser } from '../../../store/dm_people';
import { useUserSearch } from "../../../context/UserSearch";
import SearchAll from "../Search/SearchAll"


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
			return `Channel: ${val1}`;
		} else {
			return `DM${val1 < recipientId ? val1 : recipientId}${val1 > recipientId ? val1 : recipientId}`;
		}
	};

	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const channel_messages = useSelector(state => state.channelMessages);
	const direct_messages = useSelector(state => state.directMessages);
	const dms = useSelector(state => state.dm_users);
	const userId = useSelector(state => state.session.user.id);

	const history = useHistory();

	const { searchParam, setSearchParam, matchingUsers, setMatchingUsers } = useUserSearch();

	const textInput = useRef(null);

	let slice;
	let roomNum;

	//Check if path is for channel, dm or dm/all which will list dms and have
	//search functionality
	if (location.pathname.includes('channel')) {
		roomNum = room.split(' ')[1];
		slice = 'channelMessages';
		setRoom(hashingRoom(id));
	} else if (location.pathname === '/dms/all') {
		slice = 'dm_users';
	} else if (location.pathname.includes('dm')) {
		roomNum = id;
		setRoom(hashingRoom(userId, id));
		slice = 'directMessages';
	}
	let messages = useSelector(state => state[slice]);
	console.log(messages)
	let textField;

	//Handle Send Message
	const sendMessage = e => {
		e.preventDefault();
		textField = textInput.current.state.value;
		if (textField && textField !== '<br>') {
			let editor = textInput.current.getEditor();
			let text = textField.slice(0, 2) + " class='chat__text' " + textField.slice(2)

			editor.deleteText(0, text.length);

			if (location.pathname.includes('dm')) {
				// console.log("before dm")
				if (!(id in dms)) {
					console.log(id);
					console.log(dms);
					dispatch(getDMUser(id));
				}
				socket.emit('dm', {
					sender_id: userId,
					recipient_id: id,
					message: text,
					room: hashingRoom(userId, id),
				});
			} else {
				console.log('HERE IN CHAT');
				socket.emit('chat', { room: id, id: userId, message: text });
			}
			// console.log(text)
		}
	};

	const handleClick = (id) => {
		//GOTTA figure out how to grab the messages user id to delete from local storage.
		console.log(id)
		if (window.localStorage.getItem(id.toString())) {
			window.localStorage.removeItem(id.toString())
		}
		return 
	}

	//  USEEFFECTS

	useEffect(() => {
		if (location.pathname.includes('channel')) {
			slice = 'channelMessages';
			setRoom(hashingRoom(id));
		} else {
			setRoom(hashingRoom(userId, id));
			slice = 'directMessages';
		}
		if (!channel_messages[id] && slice === 'channelMessages') {
			dispatch(getChannelMessages(id));
		}
		if (!direct_messages[id] && slice === 'directMessages') {
			dispatch(getDirectMessages(id));
		}
	}, [room, dispatch, id]);

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch('/api/users/');
			const data = await res.json();
			console.log('SEARCH PARAM', searchParam, "/n", 'matching users', matchingUsers)
			setMatchingUsers(
				data.users.filter(user => {
					return (
            user.firstname?.toLowerCase().indexOf(searchParam.toLowerCase()) ===
              0 ||
            user.lastname?.toLowerCase().indexOf(searchParam.toLowerCase()) === 0
			||
			`${user.firstname} ${user.lastname}`.toLowerCase().indexOf(searchParam.toLowerCase()) === 0
          );
				})
			);
		};
		if (searchParam.length > 0) fetchUsers()
		else { setMatchingUsers([])}
	}, [searchParam]);

	let messageItem;

	if (isAddDM) {
		messageItem = Object.keys(messages).map((msg, idx) => {
			return (
        <Link
          key={idx}
          onClick={() => handleClick(messages[msg].id)}
	
          to={`/dm/${messages[msg].id}`}
        >
          <div className="main__chat-item">
            <div className="chat__image-container">
              <img
                src={messages[msg].profile_photo}
                alt="profile-photo"
                className="chat__avatar"
              ></img>
            </div>
            <div className="chat__other-info">
              {messages[msg].firstname + " " + messages[msg].lastname}
            </div>
          </div>
        </Link>
      );
		});
	}

	//FUNCTIONS//

	const handleSubmit = e => {
		e.preventDefault();

		console.log(e.target.id);
		/*need logic to check if user exits in dm store.
		If it does, we need to link to that users DMs.
		*/

		setSearchParam("")
		setMatchingUsers([])

		history.push(`/dm/${e.target.id}`);
	};
	// console.log(matchingUsers)

	// function getQuillHtml() {
	// 	return input_field.innerHTML;
	// }
	const editorContentChange = (content, delta, source, editor) => {
		console.log(editor.getHTML()); // HTML/rich text
		console.log(editor.getLength()); // number of characters
	};

	return (
    <div className="main">
      <header className="main__header">
        <SearchAll />
        <div className="main__channel-info">
          {isAddDM ? (
            <div>
              <h1 className="main__h3">All Direct Messages</h1>
            </div>
          ) : (
            <h1 className="main__h3">#2021-01-group02-juice-and-the-thunks</h1>
          )}
        </div>
        <div className="main__channel-members">
          <div>
            <i className="fas fa-user-friends"></i>{" "}
            <span className="main_channel-members-h3"></span>
          </div>
          <div>
            <i className="fas fa-user-plus"></i>{" "}
            <span className="main_channel-members-h3">Add Members</span>
          </div>
        </div>
      </header>
      <div className="main__content">
        {isAddDM ? (
          <>
            <form>
              <input
                // className="user__search"
                type="text"
                name="searchParam"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
                placeholder="@somebody"
              />
            </form>
            {matchingUsers.length > 0 && (
              <ul>
                {matchingUsers.map((user, index) => {
                  return (
                    <li>
                      <form id={user.id} onSubmit={handleSubmit}>
                        <button type="submit">
                          {user.firstname} {user.lastname}
                        </button>
                      </form>
                    </li>
                  );
                })}
              </ul>
            )}
            <section className="main__chat">{messageItem}</section>
          </>
        ) : (
          <>
            <section className="main__chat">
              {messages &&
                messages[id] &&
                Object.entries(messages[id])
                  .reverse()
                  ?.map(([id, msg]) => (
                    <Message
                      key={id}
                      msg={msg}
                      modules={modules}
                      formats={formats}
                    />
                  ))}
            </section>
            <section className="main__chat-textarea">
              <form onSubmit={sendMessage}>
                <ReactQuill
                  // placeholder={`Message #${messages[id]?.channel?.name}`}
                  modules={modules}
                  formats={formats}
                  inputClass="main__chat-textarea"
                  onSubmit={editorContentChange}
                  id="input_field"
                  ref={textInput}
                  // onChange={handleChange}
                >
                  <div className="my-editing-area"></div>
                </ReactQuill>
                <button className="main__chat-send" type="submit">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Content;
