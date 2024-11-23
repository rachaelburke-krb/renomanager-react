import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Phase } from "../../types";

interface PhaseModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (phase: Partial<Phase>) => void;
  phase?: Phase;
  isEditing?: boolean;
}

const PhaseModal: React.FC<PhaseModalProps> = ({
  show,
  onHide,
  onSave,
  phase,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: phase?.title || "",
    description: phase?.description || "",
    startDate: phase?.startDate
      ? new Date(phase.startDate).toISOString().split("T")[0]
      : "",
    endDate: phase?.endDate
      ? new Date(phase.endDate).toISOString().split("T")[0]
      : "",
    status: phase?.status || "planning",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Phase" : "Add Phase"}</Modal.Title>
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

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Phase["status"],
                })
              }
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? "Save Changes" : "Add Phase"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default PhaseModal;
