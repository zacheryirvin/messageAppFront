import React from 'react'
import {useState, useEffect} from 'react'
import {css} from '@emotion/core'
import Layout from '../components/layout.js'
import Header from '../components/header.js'
import TextBox from '../components/textBox.js'
import Messages from '../components/messages.js'
import Pusher from 'pusher-js'
import layout from '../components/layout.js'


const Conversation = ({location}) => {
  let toId;
  if (location.state){
    toId = location.state.friend.id
  }

  const getConversation = async (e) => {
    // const url = `http://localhost:4000/messages/${toId}`;
    const url = `${process.env.GATSBY_MESSAGES_URL}/${toId}`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    const response = await res.json();
    return await response;
  }

  const getConversationFeed = async (e) => {
    // const url = `http://localhost:4000/messages/${toId}/feed`;
    const url = `${process.env.GATSBY_MESSAGES_URL}/${toId}/feed`
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    const response = await res.json();
  }
  const [convo, setConvo] = useState([]);
  const [msg, setMsg] = useState()
  const string = JSON.stringify(convo)

  useEffect(() => {
    const anon = async () => {
      const conversation = await getConversation();
      const feed = await getConversationFeed();
      setConvo(conversation);
    }
    anon();
    const pusher = new Pusher('5033bb4cfc6d9a9ce2ea', {
      cluster: 'us3',
    })
    const channel = pusher.subscribe('watch_messages')
    channel.bind('new_record', (msg) => {
      // props.addMsg(messages, msg)
      setMsg(msg)
    })
    
  }, [])


  const addMsg = async (messages) => {
      // const temp = await getConversation();
      setConvo(messages)
  }

  let user,
    friendId,
    userId,
    friend

  if (location.state) {
    user = location.state.user;
    friendId = location.state.friend.id;
    userId = location.state.user.id;
    friend = location.state.friend;
  }

  useEffect(() => {
    const temp = [...convo]
    if (msg) {
      const findId = temp.find(x => {
        return x.id === msg.id
      })
      if (!findId) {
        if ((msg.to_id === toId && msg.from_id === userId) || msg.from_id === toId && msg.to_id === userId) {
          temp.unshift(msg)
          setConvo(temp)
        }
      }
    }
  },[msg])

  return (
    <>
      {convo.length === 0 
      ? <div>
        <Layout>
          <Header user={user}/>
              <div>
                <TextBox friendId={friendId}/>
              </div>
          </Layout>
          </div>
        : <>
          <Layout>
            <Header user={user}/>
            <div>
              <TextBox friendId={friendId}/>
              <Messages messages={convo} userId={userId}
                user={user} friendId={friendId}
                friend={friend} addMsg={addMsg}
                show={false}
              />
            </div>
          </Layout>
          </>
      }
    </>
  )
}

export default Conversation;
