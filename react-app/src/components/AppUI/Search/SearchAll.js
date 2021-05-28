import React, { useEffect } from 'react'
import {useSearchAll} from '../../../context/SearchAll'
const SearchAll = () => {

    const {searchAllParam, setSearchParam, 
        matchingEles, setMatchingEles} = useSearchAll()

    //*******************FETCH FUNCTION***************


    // useEffect(() => {
        
    //     const fetchUsersDMs = async () => {
    //         // let users = await fetch('/api/users/')
    //         // let userData = await users.json()
    //         // let channels = await fetch('/api/channels/all')
    //         // let channelData = channels.json()
    //     //    Promise.all([
    //     //       fetch("/api/users/"),
    //     //       fetch("/api/channels/all"),
    //     //     ]).then((res) => Promise.all(res.map((response) => response.json())))
    //     //     .then((res) => 
               
    //     //     }
    //     // )
    // }
    //     fetchUsersDMs()
    //     console.log()
    // },[searchAllParam])
    return (
        <form>
            <input
            type="text"
            value={searchAllParam}
            onChange={(e) => setSearchParam(e.target.value)}
            >
            </input>
        </form>
    )
}

export default SearchAll