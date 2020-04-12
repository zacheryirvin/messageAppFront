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
  const [selected, setSelected] = useState(new Set())
  const [button, setButton] = useState(false)
  const string = JSON.stringify(friends)

  const selectedContacts = (e) => {
    const temp = selected
    const check = temp.has(e.target.value)
    if (!check && e.target.checked) {
      temp.add(e.target.value)
      setButton(true)
      setSelected(temp)
    }
    if (check && !e.target.checked) {
      temp.delete(e.target.value)
      console.log(temp.size)
      if (temp.size === 0) {
        setButton(false)
      }
      setSelected(temp)
    }
    console.log(Array.from(selected));
  }

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

  const multiContactDelete = async (e) => {
    const url = process.env.GATSBY_FRIENDS_URL
    const arr = Array.from(selected)
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({toId: arr})
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
      <div css={css`
      display: flex;
      width: 100%;
      justify-content: space-between;
        `}>
        <div css={css`
        width: 49%;
        height: 85vh;
        margin-top: 10px;
        border: 1px solid black;
        border-radius: 10px;
          `}>
          <div css={css`
          overflow-y: scroll;
          width: 95%;
          padding: 10px;
          height: 95%;
            `}>
            <h3 css={css`
            border: 1px solid black;
            padding: 5px;
            font-family: Roboto;
            font-size: 2rem;
            border-radius: 5px;
              `}>Contacts</h3>
            {button
                ? <div css={css`
                  text-align: right;
                  margin-top: 5px;
                  `}>
                  <UserButton css={css`
                  font-size: 2rem;
                  `}
              onClick={multiContactDelete}>Un-Friend-All</UserButton>
                  </div>
                : null
            }
            {friends.map(x => {
            return (
              <div css={css`
              margin-top: 5px;
              display: flex;
                `}
                key={x.user_name}>
                { 
                  x.confirmed
                  ? <UserLink to={`/conversation`}
                    state={{user: props.user, friend: x}}
                  >{x.user_name}</UserLink>
                    : null              }
                {x.confirmed === true 
                ? <div css={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  width: 30%;
                  `}>
                    <UserButton id={x.id} onClick={deleteContact}>Un-Friend</UserButton>
                    <input css={css`
                    transform: scale(1.5);
                      `}
                      type='checkbox' value={x.id} onClick={selectedContacts}/>
                  </div>
                  : null
                }
              </div>
            )
          })}
          </div>
        </div>
        <div css={css`
        width: 49%;
        height: 50vh;
        margin-top: 10px;
        border: 1px solid black;
        border-radius: 10px;
          `}>
          <div css={css`
          overflow-y: scroll;
          width: 95%;
          padding: 10px;
            `}>
            <h3 css={css`
            border: 1px solid black;
            padding: 5px;
            font-family: Roboto;
            font-size: 2rem;
            border-radius: 5px;
              `}>Pending</h3>
            {friends.map(x => {
            return (
              <div css={css`
              margin-top: 5px;
                `}
                key={x.user_name}>
                { 
                  x.confirmed === false 
                  ? <UserLink css={css`
                  pointer-events: none;
                    `}
                    to={`/conversation`}
                    state={{user: props.user, friend: x}}
                  >{x.user_name}</UserLink>
                    : null              
                }
                {x.confirmed === false && x.requester === true
                  ? <UserButton id={x.id} onClick={deleteContact}>Cancel</UserButton>
                  : x.confirmed === false && x.requester === false
                  ? <UserButton css={css`
                    :hover {
                    background-color: darkgreen;
                    }
                  `}
                  data-id={x.id} onClick={confirmContact}>Confirm</UserButton>
                  : null
                }
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Friends;
