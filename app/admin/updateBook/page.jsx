"use client";

import { useState, useEffect } from "react";
import api from "../../api/axios";
import {useSearchParams} from "next/navigation";
import toast from "react-hot-toast";

export default function UpdateBook() {
    const searchParams = useSearchParams();
    const bookId = searchParams.get("bookId");
    const [loading, setLoading] = useState(true);

    const [bookDTO, setBook] = useState({
        id: bookId,
        title: "",
        pages: "",
        category: "",
        authorId: ""
    });

    useEffect(() => {
        if (!bookId) return;
        const fetchBook = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/books/${bookId}`);
                setBook({
                    id: res.data.id,
                    title: res.data.title || "",
                    pages: res.data.pages || "",
                    category: res.data.category || "",
                    authorId: res.data.authorId
                });
            } catch {
                toast.error("Error fetching book");
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [bookId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`books/change/${bookId}`, bookDTO);
            toast.success("Book updated successfully!");
        } catch {
            toast.error("Error updating book");
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
        <div>
            <h1>Update Book</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input name="title" type="text" value={bookDTO.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Pages:</label>
                    <input name="pages" type="text" value={bookDTO.pages} onChange={handleChange} />
                </div>
                <div>
                    <label>Category:</label>
                    <input name="category" type="text" value={bookDTO.category} onChange={handleChange} />
                </div>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
}
