import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentHome from "./StudentHome"; // Ensure StudentHome includes navigation
import { Modal, Box, Button, Typography } from "@mui/material";
import {  Visibility, CheckCircle } from "@mui/icons-material";
import "./StudentAssignment.css";

const StudentAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalQuestions, setModalQuestions] = useState('');

  // Fetch user details from localStorage
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    if (details) {
      setUserDetails(details);
    } else {
      alert("User details not found. Please sign in.");
    }
  }, []);

  // Fetch assignments and submissions
  useEffect(() => {
    if (!userDetails.email) return;

    // Fetch both assignments and submissions in parallel
    const fetchAssignmentsAndSubmissions = async () => {
      try {
        const [assignmentsResponse, submissionsResponse] = await Promise.all([
          axios.get("https://learningtrackingsystem.up.railway.app/assignments"),
          axios.get(`https://learningtrackingsystem.up.railway.app/api/assignments/submissions?email=${userDetails.email}`),
        ]);

        const allAssignments = assignmentsResponse.data;
        const submittedAssignments = submissionsResponse.data;

        // Merge submissions into assignments
        const updatedAssignments = allAssignments.map((assignment) => ({
          ...assignment,
          submitted: submittedAssignments.some(
            (submission) =>
              submission.assignmentName === assignment.name &&
              submission.studentEmail === userDetails.email
          ),
        }));

        setAssignments(updatedAssignments);
      } catch (error) {
        console.error("Error fetching assignments or submissions:", error);
      }
    };

    fetchAssignmentsAndSubmissions();
  }, [userDetails]);

  const handleFileSelection = (e, assignmentId) => {
    const file = e.target.files[0];
    setUploadedFiles((prev) => ({
      ...prev,
      [assignmentId]: file,
    }));
  };

  const handleMarkAsDone = (assignmentId, assignmentName) => {
    const file = uploadedFiles[assignmentId];
    if (!file) {
      alert("Please upload a file before marking as done.");
      return;
    }

    const formData = new FormData();
    formData.append("studentName", userDetails.name);
    formData.append("studentEmail", userDetails.email);
    formData.append("assignmentName", assignmentName);
    formData.append("file", file);

    axios
      .post("https://learningtrackingsystem.up.railway.app/api/assignments/mark-done", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        alert("Assignment marked as done successfully!");
        setAssignments((prev) =>
          prev.map((assignment) =>
            assignment.id === assignmentId
              ? { ...assignment, status: "Done", submitted: true }
              : assignment
          )
        );
      })
      .catch((error) => {
        console.error("Error marking assignment as done:", error);
        alert("Failed to mark assignment as done. Please try again.");
      });
  };

  // Open the modal and set the questions
  const handleShowQuestions = (questions) => {
    setModalQuestions(questions);
    setIsModalOpen(true);
  };

  return (
    <StudentHome>
      <div className="assignments-container">
        <h1>Assignments</h1>
        {assignments.length === 0 ? (
          <p>No assignments available yet.</p>
        ) : (
          <div className="assignments-grid">
            {assignments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((assignment) => (
              <div key={assignment.id} className="assignment-card">
                <h2>{assignment.name}</h2>
                <div className="assignment-actions">
                  <p>
                    <Visibility
                      onClick={() => handleShowQuestions(assignment.questions)}
                      style={{ cursor: 'pointer', color: '#1a73e8' }}
                    />
                    View Questions
                  </p>
                  {assignment.submitted ? (
                    <p><CheckCircle /> Already Submitted</p>
                  ) : (
                    <div className="assignment-upload-container1">
                      <div className="file-upload1">
                        <input
                          type="file"
                          onChange={(e) => handleFileSelection(e, assignment.id)}
                          disabled={assignment.submitted}
                        />
                      </div>
                      <div>
                        <button
                          onClick={() => handleMarkAsDone(assignment.id, assignment.name)}
                          disabled={!uploadedFiles[assignment.id]}
                        >
                          {assignment.status === "Done" ? "Done" : "Mark as Done"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="pagination1">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(assignments.length / itemsPerPage)))}
            disabled={currentPage === Math.ceil(assignments.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal to display assignment questions */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 400
        }}>
          <Typography variant="h6" component="h2">Assignment Questions</Typography>
          <Typography sx={{ mt: 2 }}>{modalQuestions}</Typography>
          <Button onClick={() => setIsModalOpen(false)} sx={{ mt: 2 }} color="primary">Close</Button>
        </Box>
      </Modal>
    </StudentHome>
  );
};

export default StudentAssignment;
