import React, { useState } from "react";
import { Nav, Dropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FileUpload from "../shared/FileUpload";
import { useUser } from "../../contexts/UserContext";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentUser, updateProfileImage } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleProfileImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      updateProfileImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="sidebar d-flex flex-column flex-shrink-0 bg-body-tertiary"
      style={{ width: "250px", height: "100vh", position: "fixed" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center link-body-emphasis text-decoration-none p-3"
      >
        <i className="bi bi-tools me-2 fs-4"></i>
        <span className="fs-4">RenoManager</span>
      </Link>

      <hr className="my-0" />

      <Nav className="flex-column mb-auto p-2">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/dashboard"
            className={`link-body-emphasis ps-3 ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-house me-3"></i>
              <span>Dashboard</span>
            </div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/projects/new"
            className={`link-body-emphasis ps-3 ${
              location.pathname === "/projects/new" ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-plus-square me-3"></i>
              <span>New Project</span>
            </div>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/suppliers"
            className={`link-body-emphasis ps-3 ${
              location.pathname === "/suppliers" ? "active" : ""
            }`}
          >
            <div className="d-flex align-items-center">
              <i className="bi bi-building me-3"></i>
              <span>Suppliers</span>
            </div>
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <hr className="my-0" />

      <div className="p-2">
        <Dropdown show={showDropdown} onToggle={setShowDropdown}>
          <Dropdown.Toggle
            as="div"
            className={`d-flex align-items-center p-2 link-body-emphasis text-decoration-none rounded ${
              location.pathname === "/profile" ? "active" : ""
            }`}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center flex-grow-1">
              <FileUpload onFileSelect={handleProfileImageUpload}>
                <div
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2 position-relative profile-image-container"
                  style={{
                    width: "38px",
                    height: "38px",
                    backgroundImage: currentUser?.profileImage
                      ? `url(${currentUser.profileImage})`
                      : `url('https://ui-avatars.com/api/?name=${
                          currentUser?.name || "User"
                        }&background=0D6EFD&color=fff')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="profile-image-overlay">
                    <i className="bi bi-camera text-white"></i>
                  </div>
                </div>
              </FileUpload>
              <div className="flex-grow-1">
                <div className="fw-semibold">{currentUser?.name || "User"}</div>
                <small className="text-muted">{currentUser?.email}</small>
              </div>
              <i
                className={`bi bi-chevron-${showDropdown ? "up" : "down"} ms-2`}
              ></i>
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow w-100">
            <Dropdown.Item as={Link} to="/profile">
              <i className="bi bi-gear me-2"></i>
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} className="text-danger">
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
