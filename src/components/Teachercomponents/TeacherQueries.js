import React, { useState, useEffect } from "react";
import "./TeacherQueries.css";
import TeacherHome from "./TeacherHome";

const TeacherQueries = () => {
  const [queries, setQueries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/queries/all");
      if (!response.ok) {
        throw new Error("Failed to fetch queries.");
      }
      const data = await response.json();
      setQueries(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSolutionSubmit = async (e, queryId, solution) => {
    e.preventDefault();
    if (!solution.trim()) {
      alert("Solution cannot be empty.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/queries/solution?queryId=${queryId}&solution=${encodeURIComponent(solution)}`,
        {
          method: "POST",
        }
      );

      if (response.status === 409) {
        alert("Solution already submitted for this query.");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to submit solution.");
      }

      alert("Solution submitted successfully!");
      fetchQueries(); // Refresh the queries after submission
    } catch (err) {
      alert(err.message);
    }
  };

  const currentQuery = queries[currentIndex];

  return (
    <TeacherHome>
      <div className="queries-container">
        <h2>Student Queries</h2>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : currentQuery ? (
          <div className="query-item">
            <p>
              <strong>Student Name:</strong> {currentQuery.studentName}
            </p>
            <p>
              <strong>Email:</strong> {currentQuery.studentEmail}
            </p>
            <p>
              <strong>Query:</strong> {currentQuery.query}
            </p>
            <p>
              <strong>Asked At:</strong>{" "}
              {new Date(currentQuery.askedAt).toLocaleString()}
            </p>
            {currentQuery.solution ? (
              <div>
                <p>
                  <strong>Solution:</strong> {currentQuery.solution}
                </p>
                <p>
                  <strong>Solution At:</strong>{" "}
                  {new Date(currentQuery.solutionAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) =>
                  handleSolutionSubmit(
                    e,
                    currentQuery.id,
                    e.target.solution.value
                  )
                }
              >
                <textarea
                  name="solution"
                  placeholder="Enter solution here..."
                  required
                ></textarea>
                <button type="submit">Submit Solution</button>
              </form>
            )}
          </div>
        ) : (
          <p>No queries available.</p>
        )}
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
              setCurrentIndex((prev) => Math.min(prev + 1, queries.length - 1))
            }
            disabled={currentIndex === queries.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </TeacherHome>
  );
};

export default TeacherQueries;
