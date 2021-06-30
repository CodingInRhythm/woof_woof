import React, { useState, useEffect } from "react";
import "./DMs.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ContextMenuWrapper,
} from "react-context-menu-wrapper";
import { getDirectMessages } from "../../../store/direct_messages";
import MyContextMenu from "./ContextMenu";

const DMPerson = ({ dmusers, recipient }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isClicked, setIsClicked] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [numberMessages, setNumberMessages] = useState(0);

  let location = useLocation();
  const directMessageObj = useSelector((state) => state.directMessages);
  let directMessageChannel;
  if (directMessageObj[recipient.id] !== undefined) {
    directMessageChannel = directMessageObj[recipient.id];
  }

  const handleClick = () => {
    if (!isClicked) {
      dispatch(getDirectMessages(recipient.id));
      setIsClicked(true);
    }
    history.push(`/dm/${recipient.id}`);
    setNewMessage(false);
    setNumberMessages(0);
  };
  const removeDM = (e) => {
	  e.preventDefault()

    window.localStorage.setItem(`${recipient.id}`, `${recipient.id}`);

	return history.push("/dms/all")
  };
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "dm__button--active" : "";
  };

  const getOnlineStatus = () => {
    return recipient.online_status ? "dm__button--online" : "";
  };

  //useeffect WHERE NOTIFICATIONS FIRE

  useEffect(() => {
    if (location.pathname !== `/dm/${recipient.id}` && isLoaded) {
      setNewMessage(true);
      setNumberMessages(numberMessages + 1);
    }
    if (window.localStorage.getItem('newMsg') === recipient.id.toString()) {
      setNewMessage(true)
      setNumberMessages(numberMessages + 1)
      window.localStorage.removeItem('newMsg')
    }
    setIsLoaded(true);
  }, [directMessageChannel]);

  return (
    <li className={
		`dm__li` +
		" " +
		getNavLinkClass(`/dm/${recipient.id}`)
	  } key={recipient.id}>
      <button
        id={`dm_${recipient.id}`}
        onClick={handleClick}
        className={
          `dm__button` +
          " " +
          getNavLinkClass(`/dm/${recipient.id}`) +
          " " +
          getOnlineStatus()
        }
      >
        <span
          className={newMessage ? "new_message" : ""}
        >{`${recipient.firstname} ${recipient.lastname}`}</span>

        {numberMessages > 0 && (
          <span className="new_message-number">{numberMessages}</span>
        )}
      </button>
	  {numberMessages < 1 && (
      <button id={recipient.id} onClick={removeDM} className="remove-dm">
        <span className="x">x</span>
      </button>
	  )
		}
    </li>
  );
};

const DMs = () => {
  const conversations = useSelector((state) => state.dm_users);
  const history = useHistory();
  const directMessageObj = useSelector((state) => state.directMessages);
  let arr = [];
  let invisibleArray = [];
  Object.keys(window.localStorage).forEach((key) => {
    invisibleArray.push(Number(key));
  });

  for (let id of Object.keys(conversations)) {
    if (!invisibleArray.includes(Number(id))) {
      arr.push(conversations[id]);
    }
  }

  //*************useEFECT*********************** */

  useEffect(() => {
	return
  },[directMessageObj])

  //FUNCTIONS

  const newMessage = () => {
    history.push("/dms/all");
  };
  //Component is mapping thru conversations

  const menuId = "durect_messages-menu";

  return (
    <div className="dm">
      <h2 className="dm__heading">
        <span>
          Direct messages <span className="dm__number">({arr.length})</span>
        </span>
        <Link to='/dms/all'><i className="dm__heading-add fas fa-plus"></i></Link>
      </h2>

      <ul className="dm__list">
        {arr?.map((conversation, i) => (
          <DMPerson dmusers={arr} recipient={conversation} key={conversation.id} />
        ))}
        <ContextMenuWrapper id={menuId}>
          <MyContextMenu />
        </ContextMenuWrapper>
        <li className="dm__item">
          <button onClick={newMessage} className="dm__add">
            <span className="dm__add--plussign">+</span>
            <span className="dm__add">Add teammates</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
export default DMs;
