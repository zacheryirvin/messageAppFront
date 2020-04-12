import React, {useState, useEffect} from 'react'
import {css} from '@emotion/core'
import Pusher from 'pusher-js'
import Layout from '../components/layout.js'

const Messages = (props) => {
  const messages = props.messages


  let idReplace = messages.map(x => {
    const userId = props.userId
    const user = props.user 
    const friendId = props.friendId
    const friend = props.friend
    if (x.from_id === userId) {
      return x = {...x, from_id: user}
    } else {
      return x = {...x, from_id: friend}
    }
  })

  return (
        <div css={css`
          height: 70vh;
          border: 1px solid black;
          overflow: scroll;
          `
        }>
          {idReplace.map(x => {
            if (x.from_id.id === props.userId) {
              return (
              <div key={x.id} css={css`
              display: flex;
              justify-content: flex-end;
              padding-left: 5px;
              padding-right: 5px;
              background-color: white;
            `}>
            <div css={css`
              width: 45%;
              border: 1px solid black;
              border-radius: 10px;
              padding: 5px;
              @media(max-width: 500px) {
              width: 85%;
              }
              `}>
              <div css={css`
              font-size: 1.5rem;
              font-weight: bold;
                `}>
                {x.from_id.user_name}</div>
              <div css={css`
              font-size: 1.3rem;
                `}>
                {x.time_stp || x.date}</div>
              <p css={css`
              margin-top: 5px;
              margin-bottom: 5px;
              font-size: 1.5rem;
                `}>
                {x.message}</p>
              </div>
              </div>
              )
            } else {
              return (
              <div key={x.id} css={css`
              display: flex;
              justify-content: flex-start;
              padding-left: 5px;
              padding-right: 5px;
            `}>
            <div css={css`
              width: 45%;
              border: 1px solid white;
              border-radius: 10px;
              padding: 5px;
              color: white;
              background-color: black;
              @media(max-width: 500px) {
              width: 85%;
              }
              `}>
              <div css={css`
              font-size: 1.5rem;
              font-weight: bold;
                `}>
                {x.from_id.user_name}</div>
              <div css={css`
              font-size: 1.3rem;
                `}>
                {x.time_stp || x.date}</div>
              <p css={css`
              margin-top: 5px;
              margin-bottom: 5px;
              font-size: 1.5rem;
                `}>
                {x.message}</p>
              </div>
              </div>
              )
            }
            })}
            }
      </div>
  )
}

export default Messages;

