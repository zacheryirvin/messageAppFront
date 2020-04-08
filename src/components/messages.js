import React, {useState, useEffect} from 'react'
import {css} from '@emotion/core'
import Pusher from 'pusher-js'

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
          return (
            <div key={x.id} css={css`
              padding-left: 5px;
              padding-right: 5px;
            `}>
              <div>{x.from_id.user_name}</div>
              <div>{x.time_stp || x.date}</div>
              <p>{x.message}</p>
          </div>
          )
        })}
      </div>
  )
}

export default Messages;

