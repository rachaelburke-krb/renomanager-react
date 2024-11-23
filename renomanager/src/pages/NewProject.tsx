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
import DatePickerInput from "../components/shared/DatePickerInput";
import { Project } from "../types";
import { useProjects } from "../contexts/ProjectContext";
import { useUser } from "../contexts/UserContext";

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();
  const { currentUser } = useUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: null as Date | null,
    endDate: null as Date | null,
    location: {
      address: "",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
  });

  const [dateError, setDateError] = useState<string>("");

  const validateDates = (start: Date | null, end: Date | null): boolean => {
    if (!start || !end) return true;

    if (end < start) {
      setDateError("End date cannot be before start date");
      return false;
    }

    setDateError("");
    return true;
  };

  const handleDateChange = (
    field: "startDate" | "endDate",
    date: Date | null
  ) => {
    const updatedDates = {
      ...formData,
      [field]: date,
    };

    if (validateDates(updatedDates.startDate, updatedDates.endDate)) {
      setFormData(updatedDates);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      setDateError("Both start and end dates are required");
      return;
    }

    if (!validateDates(formData.startDate, formData.endDate)) {
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      ...formData,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: "planning",
      owner: currentUser,
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
                        <DatePickerInput
                          selected={formData.startDate}
                          onChange={(date) =>
                            handleDateChange("startDate", date)
                          }
                          label="Start Date"
                          required
                        />
                      </div>

                      <div>
                        <DatePickerInput
                          selected={formData.endDate}
                          onChange={(date) => handleDateChange("endDate", date)}
                          label="End Date"
                          minDate={formData.startDate || undefined}
                          required
                          error={dateError}
                        />
                      </div>

                      {formData.startDate && formData.endDate && !dateError && (
                        <div className="mt-3 text-center small text-muted">
                          {format(formData.startDate, "MMM d, yyyy")} -{" "}
                          {format(formData.endDate, "MMM d, yyyy")}
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
