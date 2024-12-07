import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherHome from "./TeacherHome";
import "./AssignmentManagement.css";

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({ name: "", questions: "" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    axios
      .get("https://learningtrackingsystem.up.railway.app/assignments")
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleAddAssignment = () => {
    if (newAssignment.name && newAssignment.questions) {
      axios
        .post("https://learningtrackingsystem.up.railway.app/assignments", newAssignment)
        .then((response) => {
          setAssignments([...assignments, response.data]);
          setNewAssignment({ name: "", questions: "" });
          setStatusMessage("Assignment added successfully!");
        })
        .catch((error) => {
          console.error("Error adding assignment:", error);
          setStatusMessage("Failed to add assignment. Please try again.");
        });
    } else {
      setStatusMessage("Please fill in all fields.");
    }
  };

  const handleDeleteAssignment = (id) => {
    axios
      .delete(`https://learningtrackingsystem.up.railway.app/assignments/${id}`)
      .then(() => {
        setAssignments(assignments.filter((a) => a.id !== id));
        setStatusMessage("Assignment and related submissions deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting assignment:", error);
        setStatusMessage("Failed to delete assignment. Please try again.");
      });
  };

  const currentAssignment = assignments[currentIndex];

  return (
    <TeacherHome>
      <div className="assignment-management-container">
        <h1>Assignment Management</h1>

        <div className="assignment-form">
          <input
            type="text"
            name="name"
            placeholder="Assignment Name"
            value={newAssignment.name}
            onChange={handleChange}
          />
          <textarea
            name="questions"
            placeholder="Assignment Questions"
            value={newAssignment.questions}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleAddAssignment}>
            Add Assignment
          </button>
        </div>

        <div className="assignments-list">
          <h2>Assignments</h2>
          {statusMessage && <p className="status-message">{statusMessage}</p>}
          {currentAssignment ? (
            <div key={currentAssignment.id} className="assignment-card">
              <p>
                <strong>Name:</strong> {currentAssignment.name}
              </p>
              <p>
                <strong>Questions:</strong> {currentAssignment.questions}
              </p>
              <button
                className="delete-btn"
                onClick={() => handleDeleteAssignment(currentAssignment.id)}
              >
                Delete
              </button>
            </div>
          ) : (
            <p>No assignments available.</p>
          )}
        </div>

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
          >
            Prev
          </button>
          <button
            className="pagination-button"
            onClick={() =>
              setCurrentIndex((prev) => Math.min(prev + 1, assignments.length - 1))
            }
            disabled={currentIndex === assignments.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </TeacherHome>
  );
};

export default AssignmentManagement;
