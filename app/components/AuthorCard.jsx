import React from "react";

export default function AuthorCard({ authorId, name, surname, onClick }) {
    return (
        <div
            onClick={() => onClick(authorId)}>
            <h2>{name} {surname}</h2>
        </div>
    );
}