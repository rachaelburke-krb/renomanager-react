import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Project } from "../../types";
import DatePickerInput from "../shared/DatePickerInput";

interface EditProjectModalProps {
  show: boolean;
  onHide: () => void;
  project: Project;
  onSave: (updatedProject: Project) => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  show,
  onHide,
  project,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    startDate: project.startDate,
    endDate: project.endDate,
    location: {
      address: project.location.address,
      coordinates: project.location.coordinates,
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

    if (!formData.startDate || !formData.endDate) {
      setDateError("Both start and end dates are required");
      return;
    }

    onSave({
      ...project,
      ...formData,
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <DatePickerInput
                  selected={formData.startDate}
                  onChange={(date) => handleDateChange("startDate", date)}
                  label="Start Date"
                  required
                  error={dateError}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <DatePickerInput
                  selected={formData.endDate}
                  onChange={(date) => handleDateChange("endDate", date)}
                  label="End Date"
                  minDate={formData.startDate}
                  required
                  error={dateError}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={formData.location.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: { ...formData.location, address: e.target.value },
                })
              }
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProjectModal;
