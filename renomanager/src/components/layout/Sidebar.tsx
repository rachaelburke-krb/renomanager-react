import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar"
      style={{ width: "280px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <span className="fs-4">RenoManager</span>
      </a>
      <hr />
      <Nav className="flex-column mb-auto">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
          >
            <i className="bi bi-house-door me-2"></i>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/projects/new"
            className={location.pathname === "/projects/new" ? "active" : ""}
          >
            <i className="bi bi-plus-square me-2"></i>
            New Project
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>User</strong>
        </a>
        <ul className="dropdown-menu text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
