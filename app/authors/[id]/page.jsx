"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import api from "../../api/axios";
import BookCard from "../../components/BookCard";
import toast from "react-hot-toast";

export default function AuthorDetail() {
    const {id} = useParams();
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const authorRes = await api.get(`/authors/${id}`);
                setAuthor(authorRes.data);
                const booksRes = await api.get(`/authors/get-books-by-author-id/${id}`);
                setBooks(booksRes.data);
            } catch (err) {
                console.error(err);
                toast.error("Error during fetching.")
                setAuthor(null);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleClick = (bookId) => {
        router.push(`/books/${bookId}`);
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }
    if (!author) {
        return <p>No data about Author</p>;
    }

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="author-page">
            <header className="author-header">
                <h1 className="author-name">{author.name} {author.surname}</h1>
            </header>
            <section className="author-stats">
                <div className="stat">
                    <span className="stat-label">Sex:</span> <span className="stat-value">{author.sex}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Date of Birth:</span> <span className="stat-value">{author.dateOfBirth}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Age:</span> <span className="stat-value">{author.age ? author.age : "DEAD"}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Alive:</span> <span className="stat-value">{author.isAlive ? "Yes" : "No"}</span>
                </div>
            </section>
            <section className="author-books">
                <h2>Books by this author</h2>
                {books.length > 0 ? (
                    <div className="books-grid">
                        {books.map((b) => (
                            <BookCard
                                key={b.id}
                                title={b.title}
                                onClick={() => handleClick(b.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No books written by this author</p>
                )}
            </section>
        </div>
    );
}