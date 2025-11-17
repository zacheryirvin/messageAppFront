import React, {useEffect, useState} from 'react'
import Header from '../components/header.js'
import Layout from "../components/layout.js"
import {css} from '@emotion/core'
import styled from '@emotion/styled'

const UserList = ({location}) => {

const UserButton = styled('button')`
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  padding: 2px;
  padding-left: 8px;
  padding-right: 8px;

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
  cursor: pointer;
  }
`

  const getUsers = async (e) => {
    const url = `http://localhost:4000/users/all`
    //const url = `${process.env.GATSBY_USERS_URL}/all`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    const response = await res.json()
    return response;
  }

  const [selected, setSelected] = useState([])

  const requestFriend = async (e) => {
    e.preventDefault();
    const friendId = e.target.id
    const url = `http://localhost:4000/friends/add`;
    //const url = `${process.env.GATSBY_FRIENDS_URL}/add`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({toId: friendId})
    })
    const response = await res.json();
    setSelected([...selected, friendId])
    return response;
  }

  const [users, setUsers] = useState([])
  const string = JSON.stringify(users)

  useEffect(() => {
    const anon = async () => {
      const tempUsers = await getUsers();
      const tempString = JSON.stringify(tempUsers)
      if (!tempUsers.Error) {
        if (tempString !== string) {
          setUsers(tempUsers);
        }
      }
    }
    anon();
  },[])
  console.log(selected)

  let user;
  if (location.state) {
    user = location.state.user;
  }

  return (
    <>
      <Layout>
        <Header user={user}/>
        <ul css={css`
        display: flex;
        flex-wrap: wrap;
        height: 85vh;
        overflow: auto;
        justify-content: space-between;

        @media(min-width: 500px) {
        flex-Wrap: no-wrap;
        }
          `}>
        {users.map(x => {
          if (selected.includes(x.id)) {
            return (
              <div css={css`
            display: flex;
            width: 30%;
            align-items: center;
            border: 5px solid darkgreen;
            border-radius: 5px;
            margin: 3px;
            padding: 5px;

            @media(max-width: 500px) {
            width: 88%;
            }
              `} 
              key={x.user_name}>
              <li css={css`
              font-family: Roboto;
              font-size: 1.7rem;
              padding-right: 5px;
                `}
                key={x.user_name}>{x.user_name}</li>
              <UserButton id={x.id} key={x.id} onClick={requestFriend}>Add</UserButton>
            </div>
            )
          } else {
            return (
              <div css={css`
            display: flex;
            width: 30%;
            align-items: center;
            border: 1px solid black;
            border-radius: 5px;
            margin: 3px;
            padding: 5px;

            @media(max-width: 500px) {
            width: 90%;
            }
              `} 
              key={x.user_name}>
              <li css={css`
              font-family: Roboto;
              font-size: 1.7rem;
              padding-right: 5px;
                `}
                key={x.user_name}>{x.user_name}</li>
              <UserButton id={x.id} key={x.id} onClick={requestFriend}>Add</UserButton>
            </div>
            )
          }
        })}
        </ul>
      </Layout>
    </>
  )
}

export default UserList;
