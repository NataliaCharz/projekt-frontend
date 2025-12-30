import React from "react";

export default function BookCard({ bookId, title, onClick }) {
    return (
        <div
            onClick={() => onClick(bookId)}>
            <h2>{title}</h2>
        </div>
    );
}
