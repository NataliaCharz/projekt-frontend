"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import api from "../../api/axios";
import BookCard from "../../components/BookCard";

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
    return (
        <div>
            <h1>{author.name} {author.surname}</h1>
            <p>Sex: {author.sex}</p>
            <p>Date of birth: {author.dateOfBirth}</p>
            <p>Age: {author.age ? author.age : "DEAD"}</p>
            <p>Is Author alive: {author.isAlive ? "Yes" : "No"}</p>
            <div>
                {books.length > 0 ? books.map((b) => (
                    <BookCard
                        key={b.id}
                        title={b.title}
                        onClick={() => handleClick(b.id)}
                    />
                )) : "No books written by this Author"}
            </div>
        </div>
    );
}