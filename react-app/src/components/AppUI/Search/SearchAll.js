import React, { useEffect } from 'react'
import {useSearchAll} from '../../../context/SearchAll'
import {useHistory} from 'react-router-dom'
const SearchAll = () => {

    const {searchAllParam, setSearchAllParam, matchingEles, setMatchingEles} = useSearchAll()
    let history = useHistory()
    //*******************FETCH FUNCTION***************

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.className)
        setSearchAllParam("");
        setMatchingEles([]);
        if (e.target.className === "user_ele") {
            history.push(`/dm/${e.target.id}`);
        }
        else {
            history.push(`/channels/${e.target.id}`)
        }
    }

    useEffect(() => {
        
        const fetchUsersDMs = async () => {

       
            Promise.all([
                fetch("/api/users/"),
                fetch("/api/channels/all"),
            ]).then((res) => Promise.all(res.map((response) => response.json())))
            .then((res) => {
                let users = res[0].users
                let channels = res[1].channels
                let matches = []
                console.log(users, channels)
                matches.push(users.filter((user) => {
                    return (
                        user.firstname?.toLowerCase().indexOf(searchAllParam.toLowerCase()) ===
                        0 ||
                        user.lastname?.toLowerCase().indexOf(searchAllParam.toLowerCase()) === 0
                        ||
                        `${user.firstname} ${user.lastname}`.toLowerCase().indexOf(searchAllParam.toLowerCase()) === 0
                    )
                }))
               setMatchingEles(matches[0].concat(channels.filter((channel) => {
                    return (
                        channel.name.toLowerCase().indexOf(searchAllParam.toLowerCase()) === 0
                    );
                })))
        })}
        
        if (searchAllParam.length > 0) fetchUsersDMs()
        else {setMatchingEles([])}
    },[searchAllParam])
    return (
      <form>
        <input
          className="nav-searchBar"
          type="text"
          value={searchAllParam}
          onChange={(e) => setSearchAllParam(e.target.value)}
        ></input>
        {matchingEles.length > 0 && (
          <ul className="search-container">
            {matchingEles.map((ele, index) => {
              return (
                // <li className="use_ele channel_ele search-item" key={index}>
                <button
                  key={index}
                  onClick={(e) => handleSubmit(e)}
                  id={ele.id}
                  className={ele.firstname ? "user_ele" : "channel_ele"}
                  type="submit"
                >
                  {ele.firstname ? (
                    <span className={ele.online_status ? "online_user" : ""}>
                      {`${ele.firstname} ${ele.lastname}`}
                    </span>
                  ) : (
                    <span>{`# ${ele.name}`}</span>
                  )}
                </button>
                // </li>
              );
            })}
          </ul>
        )}
      </form>
    );
}

export default SearchAll