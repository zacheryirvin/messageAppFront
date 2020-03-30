import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'gatsby'
import {css, jsx} from '@emotion/core';


const Friends = () => {

  const [friends, setFriends] = useState([]);
  const string = JSON.stringify(friends)

  const getContact = async (e) => {
    const url = 'http://localhost:4000/friends'
    const res = await fetch(url, {
      header: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
      credentials: 'include',
    })
    const response = await res.json();
    setFriends(response);
  }

  useEffect(() => {
    getContact()
  }, [string.length])

  return (
    <>
      <div>
        {friends.map(x => {
          return (
            <div key={x.user_name}>
              <Link to={`/conversation`}
                state={{friend: x}}
              >{x.user_name}</Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Friends;
