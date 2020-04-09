import React, {useEffect, useState} from 'react'
import Header from '../components/header.js'

const UserList = ({location}) => {
  // const [users, setUsers] = useState([]);

  const getUsers = async (e) => {
    // const url = `http://localhost:4000/users/all`
    const url = `${process.env.GATSBY_USERS_URL}/all`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    const response = await res.json()
    return response;
  }

  const requestFriend = async (e) => {
    e.preventDefault();
    const friendId = e.target.id
    // const url = `http://localhost:4000/friends/add`;
    const url = `${process.env.GATSBY_FRIENDS_URL}/add`
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
    console.log(response)
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

  return (
    <>
      <Header user={location.state.user}/>
      <ul>
      {users.map(x => {
        return (
          <div key={x.user_name}>
            <li key={x.user_name}>{x.user_name}</li>
            <button id={x.id} key={x.id} onClick={requestFriend}>Add</button>
          </div>
        )
      })}
      </ul>
    </>
  )
}

export default UserList;
