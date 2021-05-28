/*************************** REACT IMPORTS ***************************/
import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

/*************************** OTHER FILE IMPORTS ***************************/

import './UserProfile.css'


/*************************** COMPONENTS ***************************/
const UserProfile = ({profileUser})=>{
    const history = useHistory();
    const dispatch = useDispatch();

    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const {user} = useSelector(state => state.session);

    if(!user) {
        return(
            <Redirect to='/' />
        )
    }

    const isUser = profileUser.id === user.id

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const user = {
            credential,
            password
        }

        // let loginUser = await dispatch(login(user))

        // if (loginUser.userName) {
        //     history.replace('/')
        // } else {
        //     setErrors(loginUser.errors)
        // }
    }

    return(
        <div className='profile__div'>
            <ul className='profile__errors'>
                {errors?.map((error)=>(
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form
                className='profile__main'
                onSubmit = { handleSubmit }
            >
                <div className='profile__photo-div'>
                    {isUser && <input
                        className='profile__photo'
                        type='text'
                        placeholder='Username/Email'
                        value={credential}
                        onChange={(e)=>setCredential(e.target.value)}
                    ></input>}
                </div>
                <div className='profile__firstname-div'>
                    {isUser && <input
                        className='profile__firstname-input'
                        type='text'
                        placeholder='Username/Email'
                        value={credential}
                        onChange={(e)=>setCredential(e.target.value)}
                    ></input>}
                </div>
                <div className='profile__lastname-div'>
                    {isUser && <input
                        className='profile__lastname-input'
                        type='text'
                        placeholder='Username/Email'
                        value={credential}
                        onChange={(e)=>setCredential(e.target.value)}
                    ></input>}
                </div>
                <div className='profile__username-div'>
                    {isUser && <input
                        className='profile__lastname-input'
                        type='text'
                        placeholder='Username/Email'
                        value={credential}
                        onChange={(e)=>setCredential(e.target.value)}
                    ></input>}
                </div>
                <div className='profile__email-div'>
                    {isUser && <input
                        className='profile__lastname-input'
                        type='text'
                        placeholder='Username/Email'
                        value={credential}
                        onChange={(e)=>setCredential(e.target.value)}
                    ></input>}
                </div>
                <div>
                    <button className='profile__button hidden' type='submit'>Login</button>
                </div>
            </form>
        </div>
    )
}

/*************************** EXPORT ***************************/
export default UserProfile;