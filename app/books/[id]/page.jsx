"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import api from "../../api/axios";
import AuthorCard from "../../components/AuthorCard";

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await api.get(`/books/${id}`);
                console.log(res.data);
                setBook(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBook();
    }, [id]);

    useEffect(() => {
        if (!book) return;
        const fetchAuthor = async () => {
            if (!book) return;
            try {
                const res = await api.get(`/books/author?title=${book.title}`);
                console.log(res.data);
                setAuthor(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAuthor();
    }, [book]);

    if (!book) return <p>Loading...</p>;

    const handleClick = (authorId) => {
        router.push(`/authors/${authorId}`);
    };

    return (
        <div>
            <h1>{book.title}</h1>
            <p>Pages: {book.pages}</p>
            <p>Category: {book.category}</p>
            <div>
                Author: {author.length > 0 ? author.map((a) => (
                    <AuthorCard
                        key={a.id}
                        name={a.name}
                        surname={a.surname}
                        onClick={() => handleClick(a.id)}
                    />
                )) : "Book with no Author"}
            </div>
        </div>
    );
}