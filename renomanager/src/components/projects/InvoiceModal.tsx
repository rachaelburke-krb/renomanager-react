import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Invoice } from "../../types";

interface InvoiceModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (invoice: Partial<Invoice>) => void;
  invoice?: Invoice;
  isEditing?: boolean;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({
  show,
  onHide,
  onSave,
  invoice,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    invoiceNumber: invoice?.invoiceNumber || "",
    supplier: {
      name: invoice?.supplier.name || "",
      email: invoice?.supplier.email || "",
      phone: invoice?.supplier.phone || "",
    },
    amount: invoice?.amount?.toString() || "",
    dueDate: invoice?.dueDate
      ? new Date(invoice.dueDate).toISOString().split("T")[0]
      : "",
    status: invoice?.status || "draft",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount),
      dueDate: new Date(formData.dueDate),
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Invoice" : "Add Invoice"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Invoice Number</Form.Label>
            <Form.Control
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) =>
                setFormData({ ...formData, invoiceNumber: e.target.value })
              }
              placeholder="e.g., INV-001"
              required
            />
          </Form.Group>

          <div className="mb-4">
            <h6 className="mb-3">Supplier Details</h6>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.supplier.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, name: e.target.value },
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.supplier.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, email: e.target.value },
                  })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone (optional)</Form.Label>
              <Form.Control
                type="tel"
                value={formData.supplier.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supplier: { ...formData.supplier, phone: e.target.value },
                  })
                }
              />
            </Form.Group>
          </div>

          <div className="mb-4">
            <h6 className="mb-3">Invoice Details</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount ($)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
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
                    status: e.target.value as Invoice["status"],
                  })
                }
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? "Save Changes" : "Add Invoice"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default InvoiceModal;
