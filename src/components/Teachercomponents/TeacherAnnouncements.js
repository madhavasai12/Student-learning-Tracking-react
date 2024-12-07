import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherHome from "./TeacherHome"; // Ensure TeacherHome includes the navigation bar
import "./TeacherAnnouncements.css";

const TeacherAnnouncements = () => {
  const [students, setStudents] = useState([]); // Store students
  const [announcementText, setAnnouncementText] = useState(""); // Store announcement text
  const [selectedEmail, setSelectedEmail] = useState("all"); // Store selected email for sending announcement
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch students from the backend to populate the dropdown
    axios
      .get("https://learningtrackingsystem.up.railway.app/users") // Fetch all users from this endpoint
      .then((response) => {
        const studentUsers = response.data.filter((user) => user.role.toLowerCase() === "student");
        setStudents(studentUsers); // Set students data to the state
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setErrorMessage("Failed to fetch students.");
      });
  }, []);

  const handleAnnouncementTextChange = (e) => {
    setAnnouncementText(e.target.value); // Update the announcement text
  };

  const handleSelectEmailChange = (e) => {
    setSelectedEmail(e.target.value); // Update the selected email
  };

  const submitAnnouncement = () => {
    if (!announcementText) {
      setErrorMessage("Please enter an announcement.");
      return;
    }

    const data = new URLSearchParams();
    data.append("announcementText", announcementText);
    data.append("createdBy", "teacher"); // Replace with teacher's name or ID
    data.append("recipientEmail", selectedEmail === "all" ? "all" : selectedEmail);

    axios
      .post("https://learningtrackingsystem.up.railway.app/api/announcements", data) // Assuming you have this endpoint for posting announcements
      .then(() => {
        setSuccessMessage("Announcement sent successfully!");
        setAnnouncementText(""); // Clear the form after submission
        setErrorMessage("");
      })
      .catch((error) => {
        setErrorMessage("Failed to send announcement. Please try again.");
        console.error("Error sending announcement:", error);
      });
  };

  return (
    <TeacherHome>
      <div>
        <h1>Teacher Announcements</h1>
        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        <textarea
          value={announcementText}
          onChange={handleAnnouncementTextChange}
          placeholder="Enter announcement text"
          rows="4"
          cols="50"
        />

        <br />

        <select onChange={handleSelectEmailChange}>
          <option value="all">Send to All Students</option>
          {students.map((student) => (
            <option key={student.email} value={student.email}>
              {student.email}
            </option>
          ))}
        </select>

        <br />

        <button onClick={submitAnnouncement}>Send Announcement</button>
      </div>
    </TeacherHome>
  );
};

export default TeacherAnnouncements;
