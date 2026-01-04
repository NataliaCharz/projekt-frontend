"use client";

import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import api from "../../api/axios";
import AuthorCard from "../../components/AuthorCard";
import toast from "react-hot-toast";
import {useAuth} from "../../auth/AuthContext";

export default function BookDetail() {
    const {user} = useAuth();
    const {id} = useParams();
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState([]);
    const [inList, setInList] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/books/${id}`);
                console.log(res.data);
                setBook(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    useEffect(() => {
        if (!book) return;
        const fetchAuthor = async () => {
            if (!book) return;
            try {
                setLoading(true);
                const res = await api.get(`/books/author?title=${book.title}`);
                console.log(res.data);
                setAuthor(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthor();
    }, [book]);

    if (user.role === "USER") {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            const checkBookStatus = async () => {
                try {
                    setLoading(true);
                    const listRes = await api.get("/user/books");
                    const wishlistRes = await api.get("/user/books/wishlist");
                    setInList(listRes.data.some(b => b.id === book?.id));
                    setInWishlist(wishlistRes.data.some(b => b.id === book?.id));
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            if (book) {
                checkBookStatus();
            }
        }, [book]);
    }

    const handleAddToList = async () => {
        try {
            await api.post(`/user/books/add/${book.id}`);
            setInList(true);
            toast.success("Book added to your list!");
        } catch (err) {
            console.error(err);
            toast.error("Could not add book to your list");
        }
    };

    const handleAddToWishlist = async () => {
        try {
            await api.post(`/user/books/wishlist/add/${book.id}`);
            setInWishlist(true);
            toast.success("Book added to your wishlist!");
        } catch (err) {
            console.error(err);
            toast.error("Could not add book to your wishlist");
        }
    };

    if (!book) return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>);

    const handleClick = (authorId) => {
        router.push(`/authors/${authorId}`);
    }

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="book-page">
            <header className="book-header">
                <h1 className="book-title">{book.title}</h1>
            </header>

            <section className="book-stats">
                <div className="stat">
                    <span className="stat-label">Pages:</span> <span className="stat-value">{book.pages}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Category:</span> <span className="stat-value">{book.category}</span>
                </div>
            </section>

            <section className="book-authors">
                <h2>Author{author.length > 1 ? 's' : ''}</h2>
                {author.length > 0 ? (
                    <div className="authors-grid">
                        {author.map((a) => (
                            <AuthorCard
                                key={a.id}
                                name={a.name}
                                surname={a.surname}
                                onClick={() => handleClick(a.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <p>Book with no Author</p>
                )}
            </section>
            {user.role === "USER" && (
            <section className="book-actions">
                {!inList && <button onClick={handleAddToList}>Add to Your List</button>}
                {!inWishlist && <button onClick={handleAddToWishlist}>Add to Wishlist</button>}
            </section>)}
        </div>

    );
}