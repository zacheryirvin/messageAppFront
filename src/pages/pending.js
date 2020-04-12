import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'gatsby'
import {css} from '@emotion/core';
import styled from '@emotion/styled'
import Layout from '../components/layout.js'
import Header from '../components/header.js'

const Pending = (props) => {

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
  }

  const confirmContact = async (e) => {
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

  const [friends, setFriends] = useState([]);

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

  useEffect(() => {
    getContact()
  }, [])

  return (
    <Layout>
      <Header user={props.location.state.user}/>
      <div css={css`
      width: 97%;
      height: 85vh;
      border: 1px solid black;
      border-radius: 10px;
      margin: 0 auto;
      margin-top: 10px;
      }
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
    </Layout>
  )
}

export default Pending;
