import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const register = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                password,
            });
            console.log(response.data);
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={register}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
            {error && <div>{error}</div>}
        </div>
    );
};

export default Register;
