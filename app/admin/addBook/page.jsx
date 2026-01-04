"use client";

import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function AddBookForm() {
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState("");
    const [category, setCategory] = useState("CRIME");
    const [authors, setAuthors] = useState([]);
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [selectedAuthorId, setSelectedAuthorId] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                setLoading(true);
                const res = await api.get("/authors");
                setAuthors(res.data);
                setFilteredAuthors(res.data);
            } catch (err) {
                toast.error("Error during author fetching.")
                setAuthors([]);
                setFilteredAuthors([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthors();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAuthorId) {
            setMessage("Please select an author.");
            return;
        }
        const bookDTO = {
            title,
            pages,
            category,
            authorId: selectedAuthorId,
        };

        try {
            setLoading(true)
            await api.post("/books/add", bookDTO, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
                toast.success("Book added successfully!");
                setTitle("");
                setPages("");
                setCategory("CRIME");
                setSelectedAuthorId("");
                setFilteredAuthors(authors);
        } catch {
            toast.error("Error during adding a book!")
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
        <div className="book-form-page">
            <h2>Add New Book</h2>
            <form className="book-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Pages:</label>
                    <input
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="PHILOSOPHY">Philosophy</option>
                        <option value="PSYCHOLOGY">Psychology</option>
                        <option value="ROMANCE">Romance</option>
                        <option value="ADVENTURE">Adventure</option>
                        <option value="SCIENCE_FICTION">Science fiction</option>
                        <option value="CRIME">Crime</option>
                        <option value="KIDS">Kids</option>
                        <option value="FANTASY">Fantasy</option>
                        <option value="WAR">War</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Select author:</label>
                    <select
                        value={selectedAuthorId}
                        onChange={(e) => setSelectedAuthorId(e.target.value)}
                        required
                    >
                        <option value="">Select an author</option>
                        {filteredAuthors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name} {author.surname}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Book</button>
            </form>
        </div>
    );

}