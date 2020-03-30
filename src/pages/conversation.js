import React from 'react'
import {useState, useEffect} from 'react'


const Conversation = ({location}) => {
  const toId = location.state.friend.id;

  const getConversation = async (e) => {
    const url = `http://localhost:4000/messages/${toId}`;
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'include'
    })
    const response = await res.json();
    console.log(response);
  }
  getConversation();
  return (
  <div>Test</div>
  )
}

export default Conversation;
