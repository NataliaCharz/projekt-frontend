"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../api/axios";
import BookCard from "../components/BookCard";
import { useAuth } from "../auth/AuthContext";
import RequireAuth from "../auth/RequireAuth";

export default function BooksList() {
    const { user, loading: authLoading } = useAuth();
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const res = await api.get("/books");
                setBooks(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleClick = (bookId) => {
        router.push(`/books/${bookId}`);
    };

    const filteredBooks = books.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading || authLoading) return <div>Loading...</div>;

    return (
        <RequireAuth allowedRoles={["USER", "ADMIN"]}>
        <div>
            <input
                type="text"
                placeholder="Search for books"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading || authLoading ? (
                <div>Loading...</div>
            ) : filteredBooks.length === 0 ? (
                <p>{books.length === 0 ? "No Books" : "No Books with this criteria"}</p>
            ) : (
                filteredBooks.map((b) => (
                    <BookCard
                        key={b.id}
                        bookId={b.id}
                        title={b.title}
                        role={user?.role}
                        onClick={() => handleClick(b.id)}
                    />
                ))
            )}
        </div>
        </RequireAuth>
    );
}
