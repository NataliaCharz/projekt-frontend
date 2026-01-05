import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import api from "../api/axios"
import toast from "react-hot-toast";

export default function BookCard({
                                     bookId, title, role, onClick,
                                     showAddToList, showAddToWishlist,
                                     showRemoveFromList, showRemoveFromWishlist,
                                     onRemoveFromList, onRemoveFromWishlist
                                 }) {
    const router = useRouter();
    const [inList, setInList] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAddToList = async () => {
        try {
            await api.post(`/user/books/add/${bookId}`);
            setInList(true);
            toast.success("Book added to your list!");
        } catch {
            toast.error("Could not add book to your list");
        }
    };

    const handleAddToWishlist = async () => {
        try {
            await api.post(`/user/books/wishlist/add/${bookId}`);
            setInWishlist(true);
            toast.success("Book added to your wishlist!");
        } catch {
            toast.error("Could not add book to your list");
        }
    }

    useEffect(() => {
        if (role === "USER") {
            const checkBookStatus = async () => {
                try {
                    setLoading(true);
                    const listRes = await api.get("/user/books");
                    const wishlistRes = await api.get("/user/books/wishlist");
                    setInList(listRes.data.some(b => b.id === bookId));
                    setInWishlist(wishlistRes.data.some(b => b.id === bookId));
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            if (bookId) {
                checkBookStatus();
            }
        }
    }, [bookId]);


    const handleRemoveFromList = async () => {
        if (onRemoveFromList) {
            onRemoveFromList(bookId);
        }
    };

    const handleRemoveFromWishlist = async () => {
        if (onRemoveFromWishlist) {
            onRemoveFromWishlist(bookId);
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
        <div className="book-card">
            <div className="book-card-header"
                 onClick={() => onClick(bookId)}>
                <h2 className="book-title">{title}</h2>
            </div>
            {role === "ADMIN" && (
                <div className="book-actions">
                    <button onClick={() => router.push(`/admin/updateBook?bookId=${bookId}`)}>
                        Update book
                    </button>
                </div>
            )}
            {role === "USER" && (
                <div className="book-actions">
                    {showAddToList && !inList && <button onClick={handleAddToList}>Add to Your List</button>}
                    {showAddToWishlist && !inWishlist && <button onClick={handleAddToWishlist}>Add to Wishlist</button>}
                    {showRemoveFromList && <button onClick={handleRemoveFromList}>Remove from List</button>}
                    {showRemoveFromWishlist && <button onClick={handleRemoveFromWishlist}>Remove from Wishlist</button>}
                </div>
            )}
        </div>
    );
}
