"use client";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                const res = await api.get("/admin/contact");
                setMessages(res.data);
            } catch {
                toast.error("Failed to fetch messages");
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, []);

    const handleDeleteMessage = async (id) => {
        try {
            await api.delete(`/admin/contact/delete/${id}`);
            setMessages(prev => prev.filter(msg => msg.id !== id));
            toast.success("Message deleted successfully!");
        } catch {
            toast.error("Failed to delete message:");
            toast.error("Could not delete message");
        }
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="admin-messages-page">
            <h1 className="page-title">Admin - Contact Messages</h1>
            <div className="messages-list">
                {messages.map(msg => (
                    <div key={msg.id} className="message-card">
                        <div className="message-header">
                            <strong>{msg.name}</strong> ({msg.email})
                            <span className="message-date">{msg.createdAt.toLocaleString()}</span>
                        </div>
                        <div className="message-body">{msg.message}</div>
                        <div className="message-actions">
                            <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
