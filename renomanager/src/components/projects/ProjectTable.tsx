import React, { useState } from "react";
import { Table, Form, InputGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Project } from "../../types";

interface ProjectTableProps {
  projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Project["status"] | "all">(
    "all"
  );
  const [sortField, setSortField] = useState<keyof Project>("startDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

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

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "startDate":
          comparison =
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
        case "endDate":
          comparison =
            new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const handleSort = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof Project) => {
    if (sortField !== field) return "↕️";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div>
      <div className="mb-4">
        <div className="row">
          <div className="col-md-8">
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="col-md-4">
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
          </div>
        </div>
      </div>

      <Table hover responsive className="align-middle">
        <thead>
          <tr>
            <th
              className="text-start"
              onClick={() => handleSort("title")}
              style={{ cursor: "pointer" }}
            >
              Project Name {getSortIcon("title")}
            </th>
            <th
              className="text-start"
              onClick={() => handleSort("startDate")}
              style={{ cursor: "pointer" }}
            >
              Start Date {getSortIcon("startDate")}
            </th>
            <th
              className="text-start"
              onClick={() => handleSort("endDate")}
              style={{ cursor: "pointer" }}
            >
              End Date {getSortIcon("endDate")}
            </th>
            <th
              className="text-start"
              onClick={() => handleSort("status")}
              style={{ cursor: "pointer" }}
            >
              Status {getSortIcon("status")}
            </th>
            <th className="text-start">Location</th>
            <th className="text-start">Team</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              style={{ cursor: "pointer" }}
              className="hover-bg-light"
            >
              <td className="text-start">
                <div className="fw-medium">{project.title}</div>
                <small className="text-muted">{project.description}</small>
              </td>
              <td className="text-start">
                {format(new Date(project.startDate), "MMM d, yyyy")}
              </td>
              <td className="text-start">
                {format(new Date(project.endDate), "MMM d, yyyy")}
              </td>
              <td className="text-start">
                <Badge bg={getStatusVariant(project.status)}>
                  {project.status.replace("-", " ")}
                </Badge>
              </td>
              <td className="text-start">
                <small>{project.location.address}</small>
              </td>
              <td className="text-start">
                {project.sharedWith.length > 0 ? (
                  <small>{project.sharedWith.length} team members</small>
                ) : (
                  <small className="text-muted">No team members</small>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {filteredProjects.length === 0 && (
        <div className="text-center text-muted py-5">
          No projects found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
