import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherHome from "./TeacherHome";
import "./Resources.css";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    topic: "",
    youtube: "",
    otherresources: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/resources")
      .then((response) => setResources(response.data))
      .catch((error) => console.error("Error fetching resources:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewResource({ ...newResource, [name]: value });
  };

  const handleAddResource = () => {
    if (newResource.topic) {
      axios
        .post("http://localhost:8080/resources", newResource)
        .then((response) => {
          setResources([...resources, response.data]);
          setNewResource({
            topic: "",
            youtube: "",
            otherresources: "",
          });
        })
        .catch((error) => console.error("Error adding resource:", error));
    }
  };

  const handleDeleteResource = (id) => {
    axios
      .delete(`http://localhost:8080/resources/${id}`)
      .then(() => setResources(resources.filter((r) => r.id !== id)))
      .catch((error) => console.error("Error deleting resource:", error));
  };

  const currentResource = resources[currentIndex];

  // Split the 'otherresources' string by commas
  const otherResourcesArray = currentResource
    ? currentResource.otherresources.split(",").map((link, index) => (
        <p key={index}>
          <a href={link.trim()} target="_blank" rel="noopener noreferrer">
            {link.trim()}
          </a>
        </p>
      ))
    : [];

  return (
    <TeacherHome>
      <div className="resources-container">
        <h1>Learning Resources</h1>
        <div className="resource-form">
          <input
            type="text"
            name="topic"
            placeholder="Topic Name"
            value={newResource.topic}
            onChange={handleChange}
          />
          <input
            type="url"
            name="youtube"
            placeholder="YouTube Link"
            value={newResource.youtube}
            onChange={handleChange}
          />
          <textarea
            name="otherresources"
            placeholder="Other Resource Links (comma-separated)"
            value={newResource.otherresources}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleAddResource}>
            Add Resource
          </button>
        </div>

        <div className="resources-list">
          <h2>Added Resources</h2>
          {currentResource ? (
            <div className="resource-card">
              <p>
                <strong>Topic:</strong> {currentResource.topic}
              </p>
              <p>
                <strong>YouTube:</strong>{" "}
                <a href={currentResource.youtube} target="_blank" rel="noopener noreferrer">
                  {currentResource.youtube}
                </a>
              </p>
              <p>
                <strong>Other Resources:</strong>
              </p>
              <div className="other-resources">
                {otherResourcesArray}
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDeleteResource(currentResource.id)}
              >
                Delete
              </button>
            </div>
          ) : (
            <p>No resources available.</p>
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
              setCurrentIndex((prev) => Math.min(prev + 1, resources.length - 1))
            }
            disabled={currentIndex === resources.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </TeacherHome>
  );
};

export default Resources;
