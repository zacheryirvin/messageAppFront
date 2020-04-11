import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'gatsby'
import {css} from '@emotion/core';
import styled from '@emotion/styled'


const Friends = (props) => {
const UserLink = styled(Link)`
  display: inline-block;
  vertical-align: middle;
  flex-wrap: wrap;
  width: 200px;
  margin-right: 20px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 1.5rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;

  :hover {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform, color, background-color;
  transition-property: transform, color, background-color;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: black;
  color: white;
  }

`

const UserButton = styled('button')`
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  padding: 2px;

  :hover {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform, color, background-color;
  transition-property: transform, color, background-color;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
  background-color: darkred;
  color: white;
  cursor: pointer;
  }
`
  const [friends, setFriends] = useState([]);
  const string = JSON.stringify(friends)

  const getContact = async (e) => {
    // const url = 'http://localhost:4000/friends'
    const url = process.env.GATSBY_FRIENDS_URL
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
    const id = e.target.id || e.target.dataset.id
    // const url = `http://localhost:4000/friends`
    const url = process.env.GATSBY_FRIENDS_URL
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({toId: [id]})
    })
    getContact();
    console.log(await res.json())
  }

  const confirmContact = async (e) => {
    console.log('ran')
    const toId = e.target.dataset.id;
    // const url = `http://localhost:4000/friends/confirm`
    const url = `${process.env.GATSBY_FRIENDS_URL}/confirm`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({toId: toId})
    })
    getContact();
  }

  useEffect(() => {
    getContact()
  }, [])


  return (
    <>
      <div>
        {friends.map(x => {
          return (
            <div css={css`
            margin-top: 5px;
              `}
              key={x.user_name}>
              <UserLink to={`/conversation`}
                state={{user: props.user, friend: x}}
              >{x.user_name}</UserLink>
              {x.confirmed === false && x.requester === false
                  ? <UserButton css={css`
                  :hover {
                  background-color: darkgreen;
                  }
                    `}
                data-id={x.id} onClick={confirmContact}>Confirm</UserButton>
                : <UserButton id={x.id} onClick={deleteContact}>Un-Friend</UserButton>
                
              }
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Friends;
