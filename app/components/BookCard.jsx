import React from "react";
import {useRouter} from "next/navigation";

export default function BookCard({ bookId, title, role, onClick }) {
    const router = useRouter();
    return (
        <div>
            <div
                onClick={() => onClick(bookId)}>
                <h2>{title}</h2>
            </div>
            {role === "ADMIN" && (
                <div>
                    <button onClick={() => router.push("/admin/deleteBook")}>
                        Delete book
                    </button>
                    <button onClick={() => router.push("/admin/updateBook")}>
                        Update book
                    </button>
                </div>
            )}

            {role === "USER" && (
                <div>
                    <button onClick={() => router.push("/user/addList")}>
                        Add to Your List
                    </button>
                    <button onClick={() => router.push("/user/addWishlist")}>
                        Add to Wishlist
                    </button>
                </div>
            )}
        </div>
    );
}
