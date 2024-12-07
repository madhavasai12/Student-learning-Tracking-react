import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TeacherHome from "./TeacherHome";

const ChildrenProgress = () => {
  const { email } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/assignments/submissions?email=${email}`)
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, [email]);

  const handleGradeChange = (assignmentName, value) => {
    setGrades((prev) => ({ ...prev, [assignmentName]: value }));
  };

  const submitGrade = (assignmentName) => {
    const grade = grades[assignmentName];
    if (!grade) {
      alert("Please enter a grade before submitting.");
      return;
    }

    axios
      .post(`http://localhost:8080/api/assignments/grade`, null, {
        params: { studentEmail: email, assignmentName, grade },
      })
      .then(() => {
        setSuccessMessage(`Grade submitted for ${assignmentName}`);
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => console.error("Error submitting grade:", error));
  };

  const downloadFile = (base64Data, assignmentName) => {
    const blob = new Blob([Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = assignmentName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <TeacherHome>
      <div>
        <h1>Student Progress for {email}</h1>
        {successMessage && <p>{successMessage}</p>}
        <table>
          <thead>
            <tr>
              <th>Assignment Name</th>
              <th>Completed At</th>
              <th>File</th>
              <th>Grade</th>
              <th>Submit Grade</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.assignmentName}</td>
                <td>{new Date(assignment.completedAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => downloadFile(assignment.fileData, assignment.assignmentName)}>
                    Download File
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    value={grades[assignment.assignmentName] || ""}
                    onChange={(e) => handleGradeChange(assignment.assignmentName, e.target.value)}
                    placeholder="Enter grade"
                  />
                </td>
                <td>
                  <button onClick={() => submitGrade(assignment.assignmentName)}>Submit Grade</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TeacherHome>
  );
};

export default ChildrenProgress;
