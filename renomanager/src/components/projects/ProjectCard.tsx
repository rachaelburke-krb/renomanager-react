import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusVariant = (status: Project["status"]) => {
    switch (status) {
      case "planning":
        return "info";
      case "in-progress":
        return "warning";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <Card
      as={Link}
      to={`/projects/${project.id}`}
      className="project-card text-decoration-none"
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="mb-0">{project.title}</Card.Title>
          <Badge bg={getStatusVariant(project.status)}>
            {project.status.replace("-", " ")}
          </Badge>
        </div>
        <Card.Text className="text-muted mb-3">{project.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            {format(new Date(project.startDate), "MMM d, yyyy")} -{" "}
            {format(new Date(project.endDate), "MMM d, yyyy")}
          </small>
          <small className="text-muted">{project.location.address}</small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
