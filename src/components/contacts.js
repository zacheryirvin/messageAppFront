import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'gatsby'
import {css, jsx} from '@emotion/core';


const Friends = (props) => {
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
    (response.length) > 0
      ? setFriends(response)
      : setFriends([]);
  }

  const deleteContact = async (e) => {
    const {id} = e.target
    const url = `http://localhost:4000/friends`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({toId: [id]})
    })
    console.log(await res.json())
  }

  const confirmContact = async (e) => {
    const toId = e.target.dataset.id;
    const url = `http://localhost:4000/friends/confirm`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({toId: toId})
    })
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
                state={{user: props.user, friend: x}}
              >{x.user_name}</Link>
            {x.confirmed === false
              ? <button data-id={x.id} onClick={confirmContact}>Confirm</button>
              : null
            }
              <button id={x.id} onClick={deleteContact}>X</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Friends;
