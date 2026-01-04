"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../api/axios";
import BookCard from "../../components/BookCard";
import toast from "react-hot-toast";

export default function UserWishlist() {
    const [books, setBooks] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const res = await api.get("/user/books/wishlist");
                setBooks(res.data);
            } catch (err) {
                toast.error("Error during fetching")
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleClick = (bookId) => {
        router.push(`/books/${bookId}?fromUser=true`);
    };

    const handleRemoveFromWishlist = async (bookId) => {
        try {
            await api.delete(`/user/books/wishlist/delete/${bookId}`)
            setBooks(prev => prev.filter(b => b.id !== bookId));
            toast.success("Book removed from your list!");
        } catch (err) {
            console.error(err);
            toast.error("Could not remove book from your list");
        }
    }

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="books-grid">
            {books.map((b) => (
                <BookCard
                    key={b.id}
                    title={b.title}
                    onClick={() => handleClick(b.id)}
                    role="USER"
                    showRemoveFromWishlist={true}
                    onRemoveFromWishlist={() => handleRemoveFromWishlist(b.id)}
                />
            ))}
        </div>
    );
}
