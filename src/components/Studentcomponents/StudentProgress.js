import React, { useEffect, useState } from 'react';
import './StudentProgress.css';
import StudentHome from './StudentHome';

const StudentProgress = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [, setUserDetails] = useState({});

    useEffect(() => {
        // Retrieve user details from localStorage
        const details = JSON.parse(localStorage.getItem('userDetails'));
        if (details) {
            setUserDetails(details);
            fetchAssignments(details.email);
        } else {
            setError('User details not found. Please sign in.');
        }
    }, []);

    const fetchAssignments = async (email) => {
        try {
            const response = await fetch(`https://learningtrackingsystem.up.railway.app/api/assignments/submissions?email=${email}`);
            if (!response.ok) {
                throw new Error('Failed to fetch assignments.');
            }
            const data = await response.json();
            setAssignments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudentHome>
            <div className="progress-container">
                <h2>Your Progress</h2>
                {loading ? (
                    <p>Loading your progress...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : (
                    <table className="progress-table">
                        <thead>
                            <tr>
                                <th>Assignment Name</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.length > 0 ? (
                                assignments.map((assignment) => (
                                    <tr key={assignment.id}>
                                        <td>{assignment.assignmentName}</td>
                                        <td>{assignment.grade || 'Not graded yet'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No assignments found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </StudentHome>
    );
};

export default StudentProgress;
