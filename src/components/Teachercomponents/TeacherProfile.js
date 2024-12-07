import React, { useEffect, useState } from "react";
import TeacherHome from "./TeacherHome";
import "./TeacherProfile.css";

const TeacherProfile = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    if (details) {
      setUserDetails(details);
    } else {
      // Optional: Redirect if userDetails is not found (user is not logged in)
      alert("User details not found. Please sign in.");
    }
  }, []);

  return (
    <TeacherHome>
      <div className="dashboard-details-container">
        <h2>Welcome</h2>
        {userDetails.name ? (
          <>
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Role:</strong> {userDetails.role}</p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </TeacherHome>
  );
};

export default TeacherProfile;
