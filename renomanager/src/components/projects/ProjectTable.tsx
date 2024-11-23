import React, { useState } from "react";
import { Table, Form, InputGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Project, Invoice } from "../../types";

interface ProjectTableProps {
  projects: Project[];
}

type SortField = "title" | "startDate" | "endDate" | "status" | "totalCost";
type SortDirection = "asc" | "desc";

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>("startDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const calculateProjectTotal = (project: Project): number => {
    return project.phases
      .flatMap((phase) => phase.tasks)
      .flatMap((task) => task.invoices)
      .reduce((total, invoice) => total + invoice.amount, 0);
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) {
      return <i className="bi bi-arrow-down-up text-muted ms-1"></i>;
    }
    return sortDirection === "asc" ? (
      <i className="bi bi-sort-down text-primary ms-1"></i>
    ) : (
      <i className="bi bi-sort-up text-primary ms-1"></i>
    );
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    switch (sortField) {
      case "title":
        return multiplier * a.title.localeCompare(b.title);
      case "startDate":
        return (
          multiplier *
          (new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        );
      case "endDate":
        return (
          multiplier *
          (new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
        );
      case "status":
        return multiplier * a.status.localeCompare(b.status);
      case "totalCost":
        return (
          multiplier * (calculateProjectTotal(a) - calculateProjectTotal(b))
        );
      default:
        return 0;
    }
  });

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
    <Table hover responsive>
      <thead>
        <tr>
          <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
            Project {getSortIcon("title")}
          </th>
          <th
            onClick={() => handleSort("startDate")}
            style={{ cursor: "pointer" }}
          >
            Start Date {getSortIcon("startDate")}
          </th>
          <th
            onClick={() => handleSort("endDate")}
            style={{ cursor: "pointer" }}
          >
            End Date {getSortIcon("endDate")}
          </th>
          <th
            onClick={() => handleSort("status")}
            style={{ cursor: "pointer" }}
          >
            Status {getSortIcon("status")}
          </th>
          <th
            onClick={() => handleSort("totalCost")}
            style={{ cursor: "pointer" }}
          >
            Total Cost {getSortIcon("totalCost")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedProjects.map((project) => (
          <tr
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            style={{ cursor: "pointer" }}
          >
            <td>
              <div className="fw-medium">{project.title}</div>
              <small className="text-muted">{project.location.address}</small>
            </td>
            <td>{format(new Date(project.startDate), "MMM d, yyyy")}</td>
            <td>{format(new Date(project.endDate), "MMM d, yyyy")}</td>
            <td>
              <Badge bg={getStatusVariant(project.status)}>
                {project.status.replace("-", " ")}
              </Badge>
            </td>
            <td>
              <div className="fw-medium">
                ${calculateProjectTotal(project).toLocaleString()}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectTable;
