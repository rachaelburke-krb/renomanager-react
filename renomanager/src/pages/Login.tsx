import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { findUser } from "../data/mockUsers";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = findUser(formData.email, formData.password);

    if (user) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userName", user.name);
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={11} sm={10} md={9} lg={8} xl={7}>
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold">RenoManager</h1>
              <p className="text-muted fs-4">Manage your renovation projects</p>
            </div>

            <Card className="shadow-sm border-0">
              <Card.Body className="p-5">
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <h2 className="fs-2 fw-bold mb-4 text-center">Sign In</h2>

                    {error && (
                      <Alert variant="danger" className="py-2">
                        {error}
                      </Alert>
                    )}

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
                        <Form.Label className="fw-medium fs-5">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          placeholder="Enter your password"
                          required
                          className="py-3 px-4 fs-5"
                          size="lg"
                        />
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          size="lg"
                          className="py-3 fs-5"
                        >
                          Sign In
                        </Button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="text-muted fs-5 mb-0">
                          Don't have an account?{" "}
                          <a href="#" className="text-decoration-none">
                            Sign up
                          </a>
                        </p>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="mt-4 text-center">
              <p className="text-muted">
                © {new Date().getFullYear()} RenoManager. All rights reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
