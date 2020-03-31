import React from 'react'
import {useState, useEffect} from 'react'
import {css} from '@emotion/core'
import Layout from '../components/layout.js'
import Header from '../components/header.js'
import TextBox from '../components/textBox.js'


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
      setConvo(await getConversation());
    }
    anon();
  }, [convo.length])

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
  return (
    <>
      <Header user={location.state.user}/>
      <div>
        <TextBox friendId={location.state.friend.id}/>
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
