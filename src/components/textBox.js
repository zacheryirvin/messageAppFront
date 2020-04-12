import React, {useState} from 'react';
import {css} from '@emotion/core'
import styled from '@emotion/styled'

const TextBox = (props) => {
  const [message, setMessage] = useState("")
  const capInput = (e) => {
    const value = e.target.value;
    setMessage(value);
  }
  const UserButton = styled('button')`
    border: 1px solid black;
    background-color: white;
    border-radius: 5px;
    padding: 2px;
    font-weight: bold;
    width: 65px;

    :hover {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: color, background-color;
    transition-property: color, background-color;
    background-color: black; 
    color: white;
    cursor: pointer;
    }
  `

  const sendMessage = async (e) => {
    e.preventDefault();
    const toSend = JSON.stringify({toId: props.friendId, message: message})
    // const url = 'http://localhost:4000/messages';
    const url = process.env.GATSBY_MESSAGES_URL
    const res = await fetch(url, {
      headers: {
        Accept: '*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: toSend
    })
    const response = await res.json();
    setMessage("");
    return response;
  }
  return (
    <div css={css`
      display: flex;
      justify-content: flex-end;
      margin-top: 5px;
      margin-bottom: 5px;
    `}>
    <textarea css={css`
    font-size: 1.5rem;
    width: 40%;
    height: 150px;
    @media(max-width: 500px) {
    width: 95%;
    height: 50px;
    }
      `}
      id="messages" name="textBox" 
      autoComplete="on" autoCapitalize="sentences" maxLength="250" value={message} onChange={capInput}></textarea>
      <UserButton onClick={sendMessage}>Send</UserButton>
    </div>
  )
}

export default TextBox;
