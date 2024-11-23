import React, { useState } from "react";
import { Container, Row, Col, Card, Badge, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useProjects } from "../contexts/ProjectContext";
import { useUser } from "../contexts/UserContext";
import ProjectTable from "../components/projects/ProjectTable";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const { currentUser } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter projects for the current user (owned or shared)
  const userProjects = projects.filter(
    (project) =>
      project.owner.id === currentUser?.id ||
      project.sharedWith.includes(currentUser?.id || "")
  );

  // Apply search and status filters
  const filteredProjects = userProjects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate summary statistics for user's projects
  const projectStats = {
    total: userProjects.length,
    planning: userProjects.filter((p) => p.status === "planning").length,
    inProgress: userProjects.filter((p) => p.status === "in-progress").length,
    completed: userProjects.filter((p) => p.status === "completed").length,
  };

  // Calculate total budget for user's projects
  const totalBudget = userProjects.reduce((total, project) => {
    const projectTotal = project.phases
      .flatMap((phase) => phase.tasks)
      .flatMap((task) => task.invoices)
      .reduce((sum, invoice) => sum + invoice.amount, 0);
    return total + projectTotal;
  }, 0);

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Dashboard</h2>
      </div>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="project-card">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Projects</h6>
              <h3 className="mb-0">{projectStats.total}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="project-card">
            <Card.Body>
              <h6 className="text-muted mb-2">In Progress</h6>
              <h3 className="mb-0">{projectStats.inProgress}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="project-card">
            <Card.Body>
              <h6 className="text-muted mb-2">Total Budget</h6>
              <h3 className="mb-0">${totalBudget.toLocaleString()}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="project-card">
            <Card.Body>
              <h6 className="text-muted mb-2">Completed</h6>
              <h3 className="mb-0">{projectStats.completed}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <Form.Control
                type="search"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="planning">Planning</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Projects Table */}
      <Card>
        <Card.Body>
          <ProjectTable projects={filteredProjects} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
