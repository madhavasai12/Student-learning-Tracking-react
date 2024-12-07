import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentHome from "./StudentHome"; // Ensure StudentHome includes the navigation bar
import "./Courses.css";
import courseimg from "../images/course.png";
import { Modal, Box, Button, Typography, TextField } from "@mui/material";

const Courses = () => {
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Fetch resources from the backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/resources")
      .then((response) => setResources(response.data))
      .catch((error) => console.error("Error fetching resources:", error));
  }, []);

  // Filter resources based on the search query
  const filteredResources = resources.filter((resource) =>
    resource.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Modal with resource links
  const openModalHandler = (resource) => {
    setSelectedResource(resource);
    setOpenModal(true);
  };

  // Close the modal
  const closeModalHandler = () => {
    setOpenModal(false);
    setSelectedResource(null);
  };

  return (
    <StudentHome>
      <div className="courses-container">
        <h1>Available Topics</h1>

        {/* Search Input */}
        <TextField
          label="Search Topics"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "20px" }}
        />

        {filteredResources.length === 0 ? (
          <p className="no-resources">No Topics available yet.</p>
        ) : (
          <>
            <div className="resources-grid">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="resource-card">
                  <img
                    src={courseimg}
                    alt="Course"
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <h2>{resource.topic}</h2>
                  <Button
                    onClick={() => openModalHandler(resource)}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: "10px" }}
                  >
                    View Materials
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MUI Modal */}
      <Modal
        open={openModal}
        onClose={closeModalHandler}
        aria-labelledby="resource-modal-title"
        aria-describedby="resource-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: "80%",
          }}
        >
          <Typography id="resource-modal-title" variant="h6" component="h2">
            {selectedResource?.topic}
          </Typography>
          {selectedResource?.youtube && (
            <Typography id="resource-modal-description" sx={{ mt: 2 }}>
              <strong>YouTube:</strong>{" "}
              <a
                href={selectedResource.youtube}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0073e6" }}
              >
                Click here
              </a>
            </Typography>
          )}
          {selectedResource?.otherresources && (
            <div>
              <Typography sx={{ mt: 2 }}>
                <strong>Other Resources:</strong>
              </Typography>
              {selectedResource.otherresources.split(",").map((link, index) => (
                <Typography key={index} sx={{ mt: 1 }}>
                  <a
                    href={link.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0073e6" }}
                  >
                    {link.trim()}
                  </a>
                </Typography>
              ))}
            </div>
          )}
          <Button
            onClick={closeModalHandler}
            variant="outlined"
            color="secondary"
            sx={{ mt: 3 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </StudentHome>
  );
};

export default Courses;
