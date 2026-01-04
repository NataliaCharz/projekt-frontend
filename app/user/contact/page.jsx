"use client";
import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/admin/contact/send", form);
            toast.success("Thank you for your message!");
            setForm({ name: "", email: "", message: "" });
        } catch {
            toast.error("Failed to send message.");
        } finally {
            setLoading(false);
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
        <div className="contact-page">
            <h1>Contact Us</h1>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Message:</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={8}
                        placeholder="Write your message here..."
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </div>
    );

}

