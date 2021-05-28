/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react';


/*************************** OTHER FILE IMPORTS ***************************/
import { Modal } from '../../../context/Modal';
import UserProfile from './UserProfile';
import ProfilePhoto from './ProfilePhoto'

/*************************** COMPONENTS ***************************/

function UserProfileModal({profileUser, alt}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <div className='profile__modal-photo' onClick={() => setShowModal(true)}>
          <ProfilePhoto profileUser={profileUser} alt={alt}/>
        </div>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <UserProfile profileUser={profileUser} setShowModal={setShowModal}/>
        </Modal>
        )}
    </>
  );
}


/*************************** EXPORT ***************************/

export default UserProfileModal;