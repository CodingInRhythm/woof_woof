import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useSearchAll} from '../../../context/SearchAll'
import ProfilePhoto from '../UserProfile/ProfilePhoto'

const SearchAll = () => {

    const {searchAllParam, setSearchAllParam, matchingEles, setMatchingEles} = useSearchAll()
    //*******************FETCH FUNCTION***************

    useEffect(() => {

      const fetchUsersDMs = async () => {
          const res = await fetch('/api/search/',{
            method: 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({searchAllParam}),
          });
          const data = await res.json();
          setMatchingEles(data.values)
      };

        if (searchAllParam.length > 0) fetchUsersDMs()
        else {setMatchingEles([])}
    },[searchAllParam])


    return (
      <form className='nav-searchBar-form'>
        <input
          className="nav-searchBar"
          type="text"
          value={searchAllParam}
          placeholder='Search'
          onChange={(e) => setSearchAllParam(e.target.value)}
        ></input>
        {matchingEles.length > 0 && (
          <ul className="search-container">
            {matchingEles.map((ele, index) => {
              return (
                <Link
                  key={index}
                  onClick={(e) => setSearchAllParam('')}
                  id={ele.id}
                  className={ele.firstname ? "user_ele" : "channel_ele"}
                  type="submit"
                  to={ele.firstname ? `/dm/${ele.id}` : `/channels/${ele.id}`}
                >
                  {ele.firstname ? (
                    <span
                      id={ele.id}
                      className={`${'searchAll__user-item'} ${ele.online_status ? "user_ele" : ""}`}
                    >
                      <div className='searchAll_user-photo'>
                        <ProfilePhoto profileUser={ele} alt={'profile-photo'}/>
                      </div>
                      {`${ele.firstname} ${ele.lastname}`}
                      <p className='searchAll__secondary-info'>{ele.username}</p>
                    </span>
                  ) : (
                    <span
                      id={ele.id} className="searchAll__channel-item">
                      {`${ele.name}`}
                      <p className='searchAll__secondary-info'>{`${ele.owner.firstname} ${ele.owner.lastname}`}</p>
                    </span>
                  )}
                </Link>
              );
            })}
          </ul>
        )}
      </form>
    );
}

export default SearchAll
