/*************************** REACT IMPORTS ***************************/
import React from 'react'


/*************************** OTHER FILE IMPORTS ***************************/
import './ProfilePhoto.css'


/*************************** COMPONENTS ***************************/
const ProfilePhoto = ({profileUser, alt})=>{
    return(
        <div className='profile__photo-div'>
            {profileUser?.profile_photo ?
            <img className='profile__photo-pic' src={profileUser?.profile_photo} alt={alt}/> :
            <h2 className='profile__photo-pic-default'>{profileUser?.firstname && profileUser.firstname[0]}</h2>
            }
        </div>
    )
}

/*************************** EXPORT ***************************/
export default ProfilePhoto;