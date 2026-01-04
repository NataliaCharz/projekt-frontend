'use client';

import React from "react";
import {useLibrary} from "../hooks/useLibrary";

export default function LibraryPage() {
    const {surname, books, loading, handleChangeSurname, searchBooks} = useLibrary();
    return (
        <div className="library-page">
            <div className="library-header">
                <h1>Library</h1>
            </div>
            <div className="library-filters">
                <input
                    type="text"
                    placeholder="Author's surname"
                    value={surname}
                    onChange={e => handleChangeSurname(e.target.value)}
                />
                <button onClick={searchBooks}>Search</button>
            </div>
            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="library-grid">
                    {books.length > 0 ? (
                        books.map((book, index) => (
                            <div className="library-card" key={index}>
                                <div className="library-card-header">{book.title}</div>
                                <div className="library-card-meta">
                <span>
                  By {book.author_name && book.author_name.length > 0
                    ? book.author_name.join(", ")
                    : "Unknown Author"}
                </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No books found.</p>
                    )}
                </div>
            )}
        </div>
    );

}


