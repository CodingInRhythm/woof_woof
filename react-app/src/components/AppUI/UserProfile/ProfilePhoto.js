/*************************** REACT IMPORTS ***************************/
import React from 'react'


/*************************** OTHER FILE IMPORTS ***************************/
import './ProfilePhoto.css'


/*************************** COMPONENTS ***************************/
const UserProfile = ({profileUser, alt})=>{
    return(
        <>
            {profileUser?.profile_photo ?
            <img className='profile__photo-pic' src={profileUser?.profile_photo} alt={alt}/> :
            <h2>{profileUser?.firstname[0]}</h2>
            }
        </>
    )
}

/*************************** EXPORT ***************************/
export default UserProfile;