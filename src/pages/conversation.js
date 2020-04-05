import React from 'react'
import {useState, useEffect} from 'react'
import {css} from '@emotion/core'
import Layout from '../components/layout.js'
import Header from '../components/header.js'
import TextBox from '../components/textBox.js'
import Messages from '../components/messages.js'
import Pusher from 'pusher-js'


const Conversation = ({location}) => {
  const toId = location.state.friend.id

  const getConversation = async (e) => {
    const url = `http://localhost:4000/messages/${toId}`;
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    const response = await res.json();
    return response;
  }
  const [convo, setConvo] = useState([]);

  useEffect(() => {
    const anon = async () => {
      const result = await getConversation()
      setConvo(result);
    }
    anon();
  }, [convo.length])

  const addMsg = (msg) => {
    setConvo([...convo, msg])
  }


  // console.log(convo)
  return (
    <>
      <Header user={location.state.user}/>
      <div>
        <TextBox friendId={location.state.friend.id}/>
        <Messages messages={convo} userId={location.state.user.id}
          user={location.state.user} friendId={location.state.friend.id}
          friend={location.state.friend} addMsg={addMsg}
        />
      </div>
    </>
  )
}

export default Conversation;
