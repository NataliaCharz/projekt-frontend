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
                <div id="library-div">
                    {books.map((book, index) => (
                        <div className="library-card" key={index}>
                            <h3>{book.title}</h3>
                            <p>
                                By {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
                            </p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

