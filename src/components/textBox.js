import React, {useState} from 'react';
import {css} from '@emotion/core'

const TextBox = (props) => {
  const [message, setMessage] = useState("")
  const capInput = (e) => {
    const value = e.target.value;
    setMessage(value);
  }

  const sendMessage = async (e) => {
    e.preventDefault();
    const toSend = JSON.stringify({toId: props.friendId, message: message})
    const url = 'http://localhost:4000/messages';
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: toSend,
      credentials: 'include'
    })
    const response = await res.json();
    setMessage("");
    props.finalState();
    console.log(response)
    return response;
  }
  return (
    <div css={css`
      display: flex;
    `}>
      <textarea id="messages" name="textBox" cols="35" rows="10"
      autoComplete="on" autoCapitalize="sentences" maxLength="250" value={message} onChange={capInput}></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default TextBox;
