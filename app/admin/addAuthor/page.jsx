"use client";

import React, {useEffect, useState} from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

export default function AddAuthorForm() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [sex, setSex] = useState("MALE");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [alive, setAlive] = useState(true);
    const [age, setAge] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dateOfBirth) {
            const birthDate = new Date(dateOfBirth);
            const today = new Date();
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                calculatedAge--;
            }
            setAge(calculatedAge);
        } else {
            setAge(null);
        }
    }, [dateOfBirth]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const authorDTO = {
            name,
            surname,
            sex,
            dateOfBirth,
            age,
            alive,
            bookDTOS: [],
        };

        try {
            setLoading(true);
            await api.post("/authors/add", authorDTO, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Author added successfully!")
            setName("");
            setSurname("");
            setSex("MALE");
            setDateOfBirth("");
            setAlive(true);
            setAge(null);
        } catch {
            toast.error("Error during adding Author!")
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="author-form-page">
            {loading && (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            )}
            <h2>Add New Author</h2>
            <form className="author-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Surname:</label>
                    <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Sex:</label>
                    <select value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={alive}
                            onChange={(e) => setAlive(e.target.checked)}
                        />
                        Alive
                    </label>
                </div>
                {age !== null && <p className="age-info">Calculated Age: {age}</p>}
                <button type="submit">Add Author</button>
            </form>
        </div>
    );
}

