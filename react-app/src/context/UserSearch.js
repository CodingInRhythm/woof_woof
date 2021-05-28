import React from 'react'
import { createContext, useContext, useState } from 'react';

export const UserSearchContext = createContext()
export const useUserSearch = () => useContext(UserSearchContext)

export const UserSearchProvider = (props) => {
    
    const [searchParam, setSearchParam] = useState("");
    const [matchingUsers, setMatchingUsers] = useState([]);

    return (
        <UserSearchContext.Provider 
            value={{ searchParam, setSearchParam, matchingUsers, setMatchingUsers}}
        >
            {props.children}
        </UserSearchContext.Provider>    
    )

}

export default UserSearchProvider