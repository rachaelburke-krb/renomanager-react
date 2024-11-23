import React from "react";
import { Modal, Button } from "react-bootstrap";

interface DeleteProjectModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  projectTitle: string;
}

const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  show,
  onHide,
  onConfirm,
  projectTitle,
}) => {
  const handleDelete = () => {
    onConfirm();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete "{projectTitle}"?</p>
        <p className="text-danger mb-0">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProjectModal;
