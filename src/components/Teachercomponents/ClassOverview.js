import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherHome from "./TeacherHome"; // Ensure TeacherHome includes the navigation bar
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import "./ClassOverview.css";

const ClassOverview = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 6; // 2 rows × 3 students

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://learningtrackingsystem.up.railway.app/users")
      .then((response) => {
        const allUsers = response.data;
        const studentUsers = allUsers.filter(
          (user) => user.role && user.role.toLowerCase() === "student"
        );
        setStudents(studentUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      });
  }, []);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const viewProgress = (email) => {
    navigate(`/children-progress/${email}`); // Navigate to ChildrenProgress.js with student email
  };

  return (
    <TeacherHome>
      <div className="class-overview-container">
        <h1>All Students</h1>
        {students.length === 0 ? (
          <p>No students available yet.</p>
        ) : (
          <div className="students-grid">
            {currentStudents.map((student) => (
              <div key={student.email} className="student-card">
                <p>
                  <strong>Name:</strong> {student.name}
                </p>
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                <button
                  className="progress-button"
                  onClick={() => viewProgress(student.email)}
                >
                  Student Progress
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="pagination-buttons">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </TeacherHome>
  );
};

export default ClassOverview;
