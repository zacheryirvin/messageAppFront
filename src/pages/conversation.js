import React from 'react'
import {useState, useEffect} from 'react'
import {css} from '@emotion/core'
import Layout from '../components/layout.js'
import Header from '../components/header.js'
import TextBox from '../components/textBox.js'
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
  const [msg, setMst] = useState({})

  const string = JSON.stringify(msg);

  useEffect(() => {
    const pusher = new Pusher('5033bb4cfc6d9a9ce2ea', {
      cluster: 'us3',
    })
    console.log(pusher)
    const channel = pusher.subscribe('watch_messages')
    channel.bind('new_record', (msg) => {
      setMst(msg)
    })
  }, [])

  useEffect(() => {
    const anon = async () => {
      setConvo(await getConversation());
    }
    console.log("ran")
    anon();
  }, [])

  const finalState = () => {
    console.log(msg)
    // setConvo([...convo, JSON.parse(msg)])
  }
  console.log(msg)



  const idReplace = convo.map(x => {
    const userId = location.state.user.id
    const user = location.state.user
    const friendId = location.state.friend.id
    const friend = location.state.friend
    if (x.from_id === userId) {
      return x = {...x, from_id: user}
    } else {
      return x = {...x, from_id: friend}
    }
  })
  // console.log(convo)
  return (
    <>
      <Header user={location.state.user}/>
      <div>
        <TextBox friendId={location.state.friend.id} finalState={finalState}/>
        <div css={css`
          height: 70vh;
          border: 1px solid black;
          overflow: scroll;
          `
        }>
          {idReplace.map(x => {
          return (
            <div key={x.id} css={css`
              padding-left: 5px;
              padding-right: 5px;
            `}>
              <div>{x.from_id.user_name}</div>
              <div>{x.date}</div>
              <p>{x.message}</p>
          </div>
          )
        })}
      </div>
      </div>
    </>
  )
}

export default Conversation;
