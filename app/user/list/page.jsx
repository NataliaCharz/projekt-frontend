"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../api/axios";
import BookCard from "../../components/BookCard";

export default function BookList() {
    const [books, setBooks] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await api.get("/user/books");
                setBooks(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBooks();
    }, []);

    const handleClick = (bookId) => {
        router.push(`/user/list/${bookId}`);
    };

    return (
        <div>
            {books.map((b) => (
                <BookCard
                    key={b.id}
                    title={b.title}
                    onClick={() => handleClick(b.id)}
                />
            ))}
        </div>
    );
}
