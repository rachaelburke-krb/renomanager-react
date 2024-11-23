import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Project } from "../../types";

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
    startDate: project.startDate.toISOString().split("T")[0],
    endDate: project.endDate.toISOString().split("T")[0],
    location: {
      address: project.location.address,
      coordinates: project.location.coordinates,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...project,
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
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
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
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
