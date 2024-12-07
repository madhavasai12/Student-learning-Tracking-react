import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import Bootstrap Icons
import './StudentHome.css';

const StudentHome = ({ children }) => {
    return (
        <div className="student-dashboard">
            <header className="navbar">
                <h1 className="navbar-title">Student Dashboard</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/Courses"><i className="bi bi-book"></i> Course</Link></li>
                        <li><Link to="/assignments"><i className="bi bi-file-earmark"></i> Assignments</Link></li>
                        <li><Link to="/studentannouncements"><i className="bi bi-megaphone"></i> Announcements</Link></li>
                        <li><Link to="/student-progress"><i className="bi bi-bar-chart"></i> Progress</Link></li>
                        <li><Link to="/studentqueries"><i className="bi bi-question-circle"></i> Queries</Link></li>
                        <li><Link to="/studentprofile"><i className="bi bi-person"></i> Profile</Link></li>
                        <Link to="/signin" className="logout"><i className="bi bi-box-arrow-right"></i> Logout</Link>
                    </ul>
                </nav>
            </header>
            <main className="dashboard-content">
                {children}
            </main>
        </div>
    );
};

export default StudentHome;
