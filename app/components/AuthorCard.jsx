import React from "react";

export default function AuthorCard({ authorId, name, surname, onClick }) {
    return (
        <div className="author-card"
            onClick={() => onClick(authorId)}>
            <h2>{name} {surname}</h2>
        </div>
    );
}