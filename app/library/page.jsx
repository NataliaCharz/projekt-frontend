'use client';

import api from "../api/axios";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import Link from "next/link";

export default function LibraryPage() {
    const [surname, setSurname] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchBooks = async () => {
        if (!surname) return;
        setLoading(true);
        try {
            const res = await api.get(`/library/author/${surname}`);
            setBooks(res.data.docs || []);
        } catch (err) {
            console.error(err);
            setBooks([]);
            alert("Error during fetching");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <h1>Library</h1>
                <Link href="/login">
                    <button>Log in</button>
                </Link>
            </div>
            <input
                type="text"
                placeholder="Author's surname"
                value={surname}
                onClick={() => setSurname("")}
                onChange={e => setSurname(e.target.value)}
            />
            <button onClick={searchBooks}>Search</button>

            {loading ? <p>Loading...</p> : (
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>{book.title} by {book.author_name ? book.author_name.join(", ") : "Unknown Author"}</li>
                    ))}
                </ul>
            )}

        </div>
    );
}

