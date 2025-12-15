import React, { useEffect, useState } from "react";
import Layout from "../components/layout";

import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Legend
} from "recharts";

//const API = "http://localhost:5000/admin"; // your server listens on MGDB_PORT
const API = `${process.env.GATSBY_BASE_URL}/admin/`; // your server listens on MGDB_PORT

async function apiGet(path) {
  const res = await fetch(`${API}${path}`, {
    credentials: "include", // important for session cookie
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

export default function AdminPage() {
  const [overview, setOverview] = useState(null);
  const [messagesPerDay, setMessagesPerDay] = useState([]);
  const [topSenders, setTopSenders] = useState([]);
  const [friendStatus, setFriendStatus] = useState([]);
  const [messagesPerHour, setMessagesPerHour] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [o, mpd, ts, fs, mph] = await Promise.all([
          apiGet("/overview"),
          apiGet("/messages-per-day?days=14"),
          apiGet("/top-senders?limit=7"),
          apiGet("/friend-status"),
          apiGet("/messages-per-hour?hours=24"),
        ]);
        setOverview(o);
        setMessagesPerDay(mpd);
        setTopSenders(ts);
        setFriendStatus(fs);
        setMessagesPerHour(mph);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, []);

  return (
    <Layout>
      <h1>Admin Analytics</h1>

      {err && <p style={{ color: "red" }}>{err}</p>}

      {overview && (
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
          <Stat label="Total Users" value={overview.totalUsers} />
          <Stat label="Active (24h)" value={overview.activeLast24h} />
          <Stat label="Total Messages" value={overview.totalMessages} />
          <Stat label="Messages (24h)" value={overview.messagesLast24h} />
          <Stat label="Confirmed Friends" value={overview.confirmedFriends} />
          <Stat label="Pending Friends" value={overview.pendingFriends} />
        </div>
      )}

      <h2>Messages Per Day (Last 14 Days)</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={messagesPerDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2>Messages Per Hour (Last 24 Hours)</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={messagesPerHour}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Top Senders</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={topSenders}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="username" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>Friend Requests Status</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={friendStatus} dataKey="value" nameKey="name" label />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}

function Stat({ label, value }) {
  return (
    <div style={{ padding: 12, border: "1px solid #333", borderRadius: 8, minWidth: 160 }}>
      <div style={{ opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
