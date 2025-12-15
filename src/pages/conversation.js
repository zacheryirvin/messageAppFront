import React, { useState, useEffect } from "react";
import Layout from "../components/layout.js";
import Header from "../components/header.js";
import TextBox from "../components/textBox.js";
import Messages from "../components/messages.js";
import Pusher from "pusher-js";

const Conversation = ({ location }) => {
  // Guard: Gatsby navigation refresh can lose location.state
  const toId = location?.state?.friend?.id;
  const user = location?.state?.user;
  const friend = location?.state?.friend;
  const userId = user?.id;

  const [convo, setConvo] = useState([]);

  const getConversation = async () => {
    if (!toId) return [];
    const url = `${process.env.GATSBY_MESSAGES_URL}/${toId}`;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    const response = await res.json();
    return response;
  };

  const getConversationFeed = async () => {
    if (!toId) return;
    const url = `${process.env.GATSBY_MESSAGES_URL}/${toId}/feed`;
    await fetch(url, {
      method: "GET",
      credentials: "include",
    });
  };

  // Load conversation + subscribe to realtime updates
  useEffect(() => {
    if (!toId || !userId) return;

    let pusher;
    let channel;

    const init = async () => {
      try {
        const conversation = await getConversation();
        setConvo(conversation);

        // If this endpoint is needed to "activate" backend LISTEN/NOTIFY, keep it.
        // Otherwise you can remove it safely (Pusher is doing realtime).
        await getConversationFeed();

        pusher = new Pusher("5033bb4cfc6d9a9ce2ea", {
          cluster: "us3",
        });

        channel = pusher.subscribe("watch_messages");

        channel.bind("new_record", (incoming) => {
          // Only accept messages belonging to THIS conversation
          const a = String(incoming.from_id);
          const b = String(incoming.to_id);
          const me = String(userId);
          const other = String(toId);

          const belongs =
            (a === me && b === other) || (a === other && b === me);

          if (!belongs) return;

          // Keep newest-first ordering (matches your old unshift behavior)
          setConvo((prev) => {
            const exists = prev.some(
              (m) => String(m.id) === String(incoming.id)
            );
            if (exists) return prev;
            return [incoming, ...prev];
          });
        });
      } catch (err) {
        console.error("Conversation init failed:", err);
      }
    };

    init();

    return () => {
      try {
        if (channel) channel.unbind_all();
        if (pusher) {
          pusher.unsubscribe("watch_messages");
          pusher.disconnect();
        }
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, [toId, userId]);

  // If user navigated directly here without state, show something safe
  if (!toId || !userId) {
    return (
      <Layout>
        <Header user={user} />
        <div style={{ padding: 16 }}>
          <p>Missing conversation context. Please go back and re-open the chat.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header user={user} />
      <div>
        <TextBox friendId={toId} />

        {/* Keep your original behavior: show TextBox even if convo empty */}
        {convo.length > 0 && (
          <Messages
            messages={convo}
            userId={userId}
            user={user}
            friendId={toId}
            friend={friend}
            addMsg={(messages) => setConvo(messages)}
            show={false}
          />
        )}
      </div>
    </Layout>
  );
};

export default Conversation;

