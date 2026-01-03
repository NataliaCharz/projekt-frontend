"use client";

import {useEffect, useState} from "react";
import api from "../../api/axios";

export default function AddBookForm() {
    const [title, setTitle] = useState("");
    const [pages, setPages] = useState("");
    const [category, setCategory] = useState("CRIME");
    const [surname, setSurname] = useState("");
    const [authorId, setAuthorId] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!surname) return;
        const fetchAuthor = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/authors/search/${surname}`);
                setAuthorId(res.data);
            } catch(err){
                console.log(err);
                setAuthorId(null);
            } finally {
                setLoading(false);
            }
        }
        fetchAuthor();
    }, [surname])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookDTO = {
            title,
            pages,
            category,
            authorId,
        };

        try {
            const res = await api.post("/books/add", bookDTO, authorId, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                setMessage("Book added successfully!");
                setTitle("");
                setPages("");
                setCategory("CRIME");
                setAuthorId("");
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                setMessage("Error: " + (error.response.data?.message || error.response.statusText));
            } else {
                setMessage("Network error: " + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Add New Book</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Ttile:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </label>

                <label>
                    Pages:
                    <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} required/>
                </label>

                <label>
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
                </label>
                PHILOSOPHY, PSYCHOLOGY, ROMANCE, ADVENTURE, SCIENCE_FICTION, CRIME, KIDS, FANTASY, WAR;

                <label>
                    Authors full surname:
                    <input type="text" onChange={(e) => setSurname(e.target.value)}/>
                </label>

                <button type="submit">Add Book</button>
            </form>
            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}