import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Supplier } from "../../types";
import { useSuppliers } from "../../contexts/SupplierContext";

interface SupplierModalProps {
  show: boolean;
  onHide: () => void;
  supplier?: Supplier;
  onSave: () => void;
  isEditing?: boolean;
}

const SupplierModal: React.FC<SupplierModalProps> = ({
  show,
  onHide,
  supplier,
  onSave,
  isEditing = false,
}) => {
  const { addSupplier } = useSuppliers();
  const [formData, setFormData] = useState({
    name: supplier?.name || "",
    email: supplier?.email || "",
    phone: supplier?.phone || "",
    category: supplier?.category || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const supplierData: Supplier = {
      id: supplier?.id || Date.now().toString(),
      ...formData,
    };

    addSupplier(supplierData);
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Edit Supplier" : "Add Supplier"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone (Optional)</Form.Label>
            <Form.Control
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            >
              <option value="">Select category...</option>
              <option value="design">Design</option>
              <option value="construction">Construction</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="carpentry">Carpentry</option>
              <option value="finishing">Finishing</option>
              <option value="other">Other</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? "Save Changes" : "Add Supplier"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SupplierModal;
