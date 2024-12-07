import React from "react";
import { Link } from "react-router-dom";
import "./TeacherHome.css";

const TeacherHome = ({ children }) => {
  return (
    <div className="teacher-dashboard">
      <header className="navbar">
        <h1 className="navbar-title">Teacher Dashboard</h1>
        <nav>
          <ul className="nav-links">
            <li><Link to="/class-overview">Class Overview</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/assignments-management">Assignments</Link></li>
            <li><Link to="/teacherannouncements">Announcements</Link></li>
            <li><Link to="/teacherqueries">Queries</Link></li>
            <li><Link to="/teacherprofile">Profile</Link></li>
            <Link to="/signin" className="logout">Logout</Link>
          </ul>
        </nav>
      </header>
      <main className="dashboard-content">
        {/* Dashboard dynamic content will be rendered here */}
        {children}
      </main>
    </div>
  );
};

export default TeacherHome;
