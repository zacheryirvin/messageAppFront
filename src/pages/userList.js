import React, { useEffect, useState } from "react";
import Header from "../components/header.js";
import Layout from "../components/layout.js";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const UserList = ({ location }) => {
  const UserButton = styled("button")`
    border: 1px solid black;
    background-color: white;
    border-radius: 5px;
    padding: 2px 8px;

    :hover {
      display: inline-block;
      vertical-align: middle;
      -webkit-transform: perspective(1px) translateZ(0);
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-property: transform, color, background-color;
      transition-property: transform, color, background-color;
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
      background-color: black;
      color: white;
      cursor: pointer;
    }
  `;

  // ⭐ Recommended button style
  const RecommendedButton = styled("button")`
    border: 1px solid black;
    background-color: #ffd54a; /* yellow/gold */
    border-radius: 5px;
    padding: 2px 8px;
    font-weight: 700;

    :hover {
      display: inline-block;
      vertical-align: middle;
      -webkit-transform: perspective(1px) translateZ(0);
      transform: perspective(1px) translateZ(0);
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
      -webkit-transition-property: transform, color, background-color;
      transition-property: transform, color, background-color;
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
      background-color: black;
      color: #ffd54a;
      cursor: pointer;
    }
  `;

  const getUsers = async () => {
    const url = `${process.env.GATSBY_USERS_URL}/all`;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    return res.json();
  };

  // ✅ Uses your route: /friends/suggestions
  const getSuggestions = async () => {
    const url = `${process.env.GATSBY_FRIENDS_URL}/suggestions?limit=50`;
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    return res.json(); // should be array of suggested users or ids
  };

  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const [recommendedIds, setRecommendedIds] = useState(new Set());

  const requestFriend = async (e) => {
    e.preventDefault();
    const friendId = e.currentTarget.id;

    const url = `${process.env.GATSBY_FRIENDS_URL}/add`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ toId: friendId }),
    });

    // Even if you don't use the response, keep the UI snappy
    await res.json().catch(() => null);

    setSelected((prev) => [...prev, friendId]);

    // Optional: remove from recommended once added
    setRecommendedIds((prev) => {
      const next = new Set(prev);
      next.delete(String(friendId));
      return next;
    });
  };

  useEffect(() => {
    const anon = async () => {
      // Load all users
      const tempUsers = await getUsers();
      if (!tempUsers?.Error) setUsers(tempUsers);

      // Load suggestions
      try {
        const suggestions = await getSuggestions();

        // This handles two common shapes:
        // 1) suggestions = [{ id: "uuid", ... }, ...]
        // 2) suggestions = [{ user_id: "uuid", ... }, ...]
        // 3) suggestions = ["uuid", "uuid", ...]
        const ids = new Set(
          (suggestions || []).map((s) =>
            String(s?.id || s?.user_id || s)
          )
        );

        setRecommendedIds(ids);
      } catch (err) {
        console.error("Suggestions fetch failed:", err);
      }
    };

    anon();
  }, []);

  let user;
  if (location.state) user = location.state.user;

  return (
    <Layout>
      <Header user={user} />

      <ul
        css={css`
          display: flex;
          flex-wrap: wrap;
          height: 85vh;
          overflow: auto;
          justify-content: space-between;

          @media (min-width: 500px) {
            flex-wrap: no-wrap;
          }
        `}
      >
        {users.map((x) => {
          const isSelected = selected.includes(x.id);
          const isRecommended = recommendedIds.has(String(x.id));
          const AddBtn = isRecommended ? RecommendedButton : UserButton;

          return (
            <div
              css={css`
                display: flex;
                width: 30%;
                align-items: center;
                border: ${isSelected ? "5px solid darkgreen" : "1px solid black"};
                border-radius: 5px;
                margin: 3px;
                padding: 5px;

                @media (max-width: 500px) {
                  width: 90%;
                }
              `}
              key={x.id}
            >
              <li
                css={css`
                  font-family: Roboto;
                  font-size: 1.7rem;
                  padding-right: 5px;
                `}
              >
                {x.user_name}
              </li>

              <AddBtn id={x.id} onClick={requestFriend}>
                {isRecommended ? "Recommended" : "Add"}
              </AddBtn>
            </div>
          );
        })}
      </ul>
    </Layout>
  );
};

export default UserList;

