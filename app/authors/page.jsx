"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../api/axios";
import AuthorCard from "../components/AuthorCard"

export default function AuthorsList() {
    const [authors, setAuthors] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                setLoading(true);
                const res = await api.get("/authors");
                setAuthors(res.data);
            } catch (err) {
                console.error(err);
                setAuthors([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    const handleClick = (authorId) => {
        router.push(`/authors/${authorId}`);
    };

    const filteredAuthors = authors.filter((a) =>
        a.surname.toLowerCase().includes(search.toLowerCase()) ||
        a.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search for author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            {!loading && authors.length === 0 && (
                <p>No Authors</p>
            )}
            {!loading && authors.length > 0 && filteredAuthors.length === 0 && (
                <p>No Authors with this criteria</p>
            )}
            {!loading && filteredAuthors.map((a) => (
                <AuthorCard
                    key={a.id}
                    name={a.name}
                    surname={a.surname}
                    onClick={() => handleClick(a.id)}
                />
            ))}
        </div>
    );
}

