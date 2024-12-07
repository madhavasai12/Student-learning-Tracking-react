import React, { useState, useEffect } from 'react';
import './StudentQueries.css';
import StudentHome from './StudentHome';

const StudentQueries = () => {
    const [query, setQuery] = useState('');
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve user details from localStorage
        const details = JSON.parse(localStorage.getItem('userDetails'));
        if (details) {
            setUserDetails(details);
            fetchQueries(details.email);
        } else {
            setError('User details not found. Please sign in.');
        }
    }, []);

    const fetchQueries = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/api/queries/student?email=${email}`);
            if (!response.ok) {
                throw new Error('Failed to fetch queries.');
            }
            const data = await response.json();
            setQueries(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const askedAt = new Date().toISOString();
            const response = await fetch('http://localhost:8080/api/queries/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentName: userDetails.name,
                    studentEmail: userDetails.email,
                    query,
                    askedAt,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit query.');
            }
            alert('Query submitted successfully!');
            setQuery('');
            fetchQueries(userDetails.email);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <StudentHome>
            <div className="queries-container">
                <h2>Your Queries</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Enter your query here..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Submit Query</button>
                </form>
                <h3>Previous Queries</h3>
                {loading ? (
                    <p>Loading queries...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : queries.length > 0 ? (
                    queries.map((q) => (
                        <div key={q.id} className="query-item">
                            <p><strong>Query:</strong> {q.query}</p>
                            <p><strong>Solution:</strong> {q.solution || 'Not answered yet'}</p>
                            <p><strong>Asked At:</strong> {new Date(q.askedAt).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No queries found.</p>
                )}
            </div>
        </StudentHome>
    );
};

export default StudentQueries;
