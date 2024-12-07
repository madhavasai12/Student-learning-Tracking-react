import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentHome from "./StudentHome"; // Ensure StudentHome includes the navigation bar
import "./StudentAnnouncements.css";

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState({}); // To store logged-in student details

  useEffect(() => {
    // Fetch user details from local storage
    const details = JSON.parse(localStorage.getItem("userDetails"));
    if (details) {
      setUserDetails(details); // Set the user details (name, email, etc.)
      fetchAnnouncements(details.email); // Fetch announcements using the student's email
    } else {
      alert("User details not found. Please sign in.");
    }
  }, []);

  const fetchAnnouncements = (email) => {
    axios
      .get(`https://learningtrackingsystem.up.railway.app/api/announcements/student/${email}`)
      .then((response) => {
        setAnnouncements(response.data);
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
        setErrorMessage("Failed to fetch announcements.");
      });
  };

  return (
    <StudentHome>
      <div className="announcements-container">
        <h1 className="title">Announcements</h1>
        {userDetails.name && <h2 className="welcome">Welcome, {userDetails.name}!</h2>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {announcements.length > 0 ? (
          <ul className="announcements-list">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="announcement-card">
                <p className="announcement-text">{announcement.announcementText}</p>
                <p className="announcement-date">
                  <strong>Created At:</strong> {new Date(announcement.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-announcements">No announcements available.</p>
        )}
      </div>
    </StudentHome>
  );
};

export default StudentAnnouncements;
