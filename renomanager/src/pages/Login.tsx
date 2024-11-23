import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { findUser, mockUsers } from "../data/mockUsers";
import { useUser } from "../contexts/UserContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = findUser(formData.email, formData.password);
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      updateUser(user);
      navigate("/dashboard");
    }
  };

  const handleQuickLogin = (email: string, password: string) => {
    const user = findUser(email, password);
    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      updateUser(user);
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        backgroundColor: "#f8f9fa",
        width: "100vw",
        margin: 0,
        padding: 0,
      }}
    >
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={11} sm={9} md={7} lg={5} xl={4}>
            <Card className="shadow border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold mb-1">RenoManager</h3>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium fs-5">
                      Email address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="name@example.com"
                      required
                      className="py-3 px-4 fs-5"
                      size="lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Form.Label className="fw-medium fs-5">Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Enter your password"
                      required
                      className="py-3 px-4 fs-5"
                      size="lg"
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="w-100 py-3 fs-5"
                  >
                    Sign In
                  </Button>
                </Form>

                <hr className="my-4" />

                <div className="text-center mb-3">
                  <p className="text-muted mb-3">Quick Login (Demo Users)</p>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {mockUsers.slice(0, 4).map((user) => (
                      <div
                        key={user.id}
                        onClick={() =>
                          handleQuickLogin(user.email, user.password)
                        }
                        className="text-center cursor-pointer"
                        style={{ cursor: "pointer" }}
                      >
                        <div
                          className="rounded-circle mb-2 mx-auto position-relative"
                          style={{
                            width: "48px",
                            height: "48px",
                            backgroundImage: `url(${user.profileImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div className="small fw-medium">{user.name}</div>
                        <Badge
                          bg={user.role === "admin" ? "primary" : "secondary"}
                          className="mt-1"
                        >
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
