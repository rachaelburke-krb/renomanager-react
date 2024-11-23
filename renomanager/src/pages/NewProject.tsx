import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Project } from "../types";
import { useProjects } from "../contexts/ProjectContext";

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: {
      address: "",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProject: Project = {
      id: Date.now().toString(),
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      status: "planning",
      sharedWith: [],
      phases: [],
      photos: [],
    };

    addProject(newProject);
    navigate("/dashboard");
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">New Project</h2>
      </div>

      <Card>
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={8}>
                <Form.Group className="mb-4">
                  <Form.Label>Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter project title"
                    required
                    size="lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Describe your project"
                    required
                  />
                </Form.Group>
              </Col>

              <Col lg={4}>
                <Form.Group className="mb-4">
                  <Form.Label>Location</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-geo-alt"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={formData.location.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: {
                            ...formData.location,
                            address: e.target.value,
                          },
                        })
                      }
                      placeholder="Enter project location"
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Project Timeline</Form.Label>
                  <Card className="bg-light border-0">
                    <Card.Body>
                      <div className="mb-3">
                        <Form.Label className="small text-muted mb-1">
                          Start Date
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <i className="bi bi-calendar"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="date"
                            value={formData.startDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                startDate: e.target.value,
                              })
                            }
                            required
                          />
                        </InputGroup>
                      </div>

                      <div>
                        <Form.Label className="small text-muted mb-1">
                          End Date
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>
                            <i className="bi bi-calendar"></i>
                          </InputGroup.Text>
                          <Form.Control
                            type="date"
                            value={formData.endDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                endDate: e.target.value,
                              })
                            }
                            required
                          />
                        </InputGroup>
                      </div>

                      {formData.startDate && formData.endDate && (
                        <div className="mt-3 text-center small text-muted">
                          {format(new Date(formData.startDate), "MMM d, yyyy")}{" "}
                          - {format(new Date(formData.endDate), "MMM d, yyyy")}
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" size="lg">
                Create Project
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewProject;
