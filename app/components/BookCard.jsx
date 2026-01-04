import React from "react";
import {useRouter} from "next/navigation";
import api from "../api/axios"
import toast from "react-hot-toast";

export default function BookCard({ bookId, title, role, onClick,
                                     showAddToList, showAddToWishlist,
                                     showRemoveFromList, showRemoveFromWishlist,
                                     onRemoveFromList, onRemoveFromWishlist }) {
    const router = useRouter();

    const handleAddToList = async () => {
        try {
            await api.post(`/user/books/add/${bookId}`);
            toast.success("Book added to your list!");
        } catch (err) {
            toast.error("Could not add book to your list");
        }
    };

    const handleAddToWishlist = async () => {
        try {
            await api.post(`/user/books/wishlist/add/${bookId}`);
            toast.success("Book added to your wishlist!");
        } catch {
            toast.error("Could not add book to your list");
        }
    }

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
                    {showAddToList && <button onClick={handleAddToList}>Add to Your List</button>}
                    {showAddToWishlist && <button onClick={handleAddToWishlist}>Add to Wishlist</button>}
                    {showRemoveFromList && <button onClick={handleRemoveFromList}>Remove from List</button>}
                    {showRemoveFromWishlist && <button onClick={handleRemoveFromWishlist}>Remove from Wishlist</button>}
                </div>
            )}
        </div>
    );
}
