import React from "react";
import { Container } from "react-bootstrap";
import ProjectTable from "../components/projects/ProjectTable";
import { useProjects } from "../contexts/ProjectContext";

const Dashboard: React.FC = () => {
  const { projects } = useProjects();

  return (
    <Container fluid className="py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Projects</h2>
      </div>
      <div className="table-responsive">
        <ProjectTable projects={projects} />
      </div>
    </Container>
  );
};

export default Dashboard;
