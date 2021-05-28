/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';
import ava from '../../../images/ava.png';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../context/Modal';
import UserProfile from './UserProfile';

/*************************** COMPONENTS ***************************/

function UserProfileModal({profileUser, classname}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <img onClick={() => setShowModal(true)} src={profileUser.profile_photo ? profileUser.profile_photo : ava} className={classname} alt="" height="70" />
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <UserProfile profileUser={profileUser}/>
        </Modal>
        )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default UserProfileModal;