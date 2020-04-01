import React, {useEffect, useState} from 'react'
import Header from '../components/header.js'

const UserList = () => {
  // const [users, setUsers] = useState([]);

  const getUsers = async (e) => {
    const url = `http://localhost:4000/users/all`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    const response = await res.json()
    return response;
  }

  const [users, setUsers] = useState([])
  const string = JSON.stringify(users)

  useEffect(() => {
    const anon = async () => {
      const tempUsers = await getUsers();
      console.log(tempUsers)
      const tempString = JSON.stringify(tempUsers)
      if (tempString != string) {
        setUsers(tempUsers);
      }
    }
    anon();
  },[])

  return (
    <>
      <Header />
      <ul>
      {users.map(x => {
        return (
            <li key={x.id}>{x.user_name}</li>
        )
      })}
      </ul>
    </>
  )
}

export default UserList;
