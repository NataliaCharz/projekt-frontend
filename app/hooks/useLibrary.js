import { useState } from "react";
import api from "../api/axios.js";
import toast from "react-hot-toast";

export function useLibrary() {
    const [surname, setSurname] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchBooks = async () => {
        if (surname.length < 3) return;
        setLoading(true);
        try {
            const res = await api.get(`/library/author/${surname}`);
            setBooks(res.data.docs || []);
        } catch (err) {
            console.error(err);
            setBooks([]);
            toast.error("Error during fetching");
        } finally {
            setLoading(false);
        }
    };

    const handleChangeSurname = (value) => {
        setSurname(value);
        if (value.length >= 3) {
            searchBooks();
        } else {
            setBooks([]);
        }
    };

    return {
        surname,
        books,
        loading,
        setSurname,
        searchBooks,
        handleChangeSurname
    };
}
