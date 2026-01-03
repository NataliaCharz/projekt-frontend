"use client";

import {useEffect, useState} from "react";
import api from "../../api/axios";

export default function AddAuthorForm() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [sex, setSex] = useState("MALE");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [alive, setAlive] = useState(true);
    const [age, setAge] = useState(null);
    const [message, setMessage] = useState("");

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
// eslint-disable-next-line react-hooks/exhaustive-deps
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
            const res = await api.post("/authors/add", authorDTO, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                setMessage("Author added successfully!");
                setName("");
                setSurname("");
                setSex("MALE");
                setDateOfBirth("");
                setAlive(true);
                setAge(null);
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                setMessage("Error: " + (error.response.data?.message || error.response.statusText));
            } else {
                setMessage("Network error: " + error.message);
            }
        }
    };

    return (
        <div>
            <h2>Add New Author</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </label>

                <label>
                    Surname:
                    <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required/>
                </label>

                <label>
                    Sex:
                    <select value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </label>

                <label>
                    Date of Birth:
                    <input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
                </label>

                <label>
                    Alive:
                    <input type="checkbox" checked={alive} onChange={(e) => setAlive(e.target.checked)}/>
                </label>

                {age !== null && <p>Calculated Age: {age}</p>}

                <button type="submit" style={{marginTop: "10px"}}>Add Author</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

