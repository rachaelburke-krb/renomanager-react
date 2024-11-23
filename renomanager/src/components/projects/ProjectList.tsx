import React, { useState } from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import { Project } from "../../types";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Project["status"] | "all">(
    "all"
  );

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-4">
        <Row>
          <Col md={8}>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as Project["status"] | "all")
              }
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {filteredProjects.map((project) => (
          <Col key={project.id}>
            <ProjectCard project={project} />
          </Col>
        ))}
        {filteredProjects.length === 0 && (
          <Col xs={12}>
            <div className="text-center text-muted py-5">
              No projects found matching your criteria
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ProjectList;
