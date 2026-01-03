"use client";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await api.get("/admin/contact");
                setMessages(res.data);
            } catch (err) {
                console.error("Failed to fetch messages:", err);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div>
            <h1>Admin - Contact Messages</h1>
            {messages.length === 0 ? (
                <p>No messages yet.</p>
            ) : (
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.id}>
                            <strong>{msg.name}</strong> ({msg.email})<br />
                            <em>{new Date(msg.createdAt).toLocaleString()}</em><br />
                            {msg.message}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
