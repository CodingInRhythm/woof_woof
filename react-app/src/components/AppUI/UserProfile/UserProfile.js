/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/

import ProfilePhoto from '../UserProfile/ProfilePhoto'
import {editUser, logout} from '../../../store/session'
import './UserProfile.css'


/*************************** COMPONENTS ***************************/
const UserProfile = ({profileUser, setShowModal})=>{
    const history = useHistory();
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState(profileUser.firstname)
    const [lastname, setLastname] = useState(profileUser.lastname)
    const [username, setUsername] = useState(profileUser.username)
    const [email, setEmail] = useState(profileUser.email)
    const [photo, setPhoto] = useState(null)
    const [errors, setErrors] = useState([])

    const {user} = useSelector(state => state.session);

    if(!user) {
        return(
            <Redirect to='/' />
        )
    }

    const isUser = profileUser.id === user.id

    const handleSubmit= (e)=>{
        e.preventDefault();
        (async()=>{
            const userInfo = {
                id:user.id,
                firstname,
                lastname,
                username,
                email,
                profile_image:photo,
            }

            let editedUser = await dispatch(editUser(userInfo))

            if (editedUser.username) {
                setShowModal(false)
            } else {
                setErrors(editedUser.errors)
            }
        })()
        }

    //Logout
    const onLogout = async e => {
      e.preventDefault();
      localStorage.clear()
      await dispatch(logout())
      history.push('/')
    }

    return(
        <div className='profile__div'>
            <form
                className='profile__main'
                onSubmit = { handleSubmit }
            >
                <div className='profile__photo-outer-container'>
                    <div className='profile__photo-container'>
                        <ProfilePhoto profileUser={profileUser} alt={'profile-photo'}/>
                        {isUser &&
                            <div className='profile__photo-input'>
                                <input type="file" id="profpic-btn" onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
                                <label htmlFor="profpic-btn" className="profile__photo-button">{photo?.name ? photo?.name : 'New Image'}</label>
                            </div>
                    }
                    </div>
                </div>
                {errors.length ? (
							<div className="errorsContainer">
								<span>The following errors occurred:</span>
								<ul className="errorsList">
									{errors.map((error, idx) => (
										<li key={idx}>{error}</li>
									))}
								</ul>
							</div>
						) : (
							<div></div>
						)}
                <div className='profile__firstname-div'>
                    {isUser ? <input
                        className='profile__firstname-input'
                        type='text'
                        placeholder='First Name'
                        value={firstname}
                        onChange={(e)=>setFirstname(e.target.value)}
                    ></input> :
                    <div className='profile__firstname'>{profileUser.firstname}</div>
                    }
                </div>
                <div className='profile__lastname-div'>
                    {isUser ? <input
                        className='profile__lastname-input'
                        type='text'
                        placeholder='Last Name'
                        value={lastname}
                        onChange={(e)=>setLastname(e.target.value)}
                    ></input> :
                    <div className='profile__lastname'>{profileUser.lastname}</div>
                    }
                </div>
                <div className='profile__username-div'>
                    {isUser ? <input
                        className='profile__username-input'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                    ></input> :
                    <div className='profile__username'>{profileUser.username}</div>
                    }
                </div>
                <div className='profile__email-div'>
                    {isUser ? <input
                        className='profile__email-input'
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    ></input> :
                    <div className='profile__email'>{profileUser.email}</div>
                    }
                </div>
                {isUser &&
                <>
                    <button className='profile__button' type='submit'>Save Changes</button>
                    <button className='profile__logout' onClick={onLogout}>Log out</button>
                </>}
            </form>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default UserProfile;