import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Task } from "../../types";

interface TaskModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (task: Partial<Task>) => void;
  task?: Task;
  isEditing?: boolean;
}

const TaskModal: React.FC<TaskModalProps> = ({
  show,
  onHide,
  onSave,
  task,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "planning",
    assignedTo: task?.assignedTo || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Task" : "Add Task"}</Modal.Title>
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

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as Task["status"],
                })
              }
            >
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Assigned To</Form.Label>
            <Form.Control
              type="text"
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({ ...formData, assignedTo: e.target.value })
              }
              placeholder="User ID or email"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? "Save Changes" : "Add Task"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskModal;
