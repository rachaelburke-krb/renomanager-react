import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { Invoice, Supplier } from "../../types";
import DatePickerInput from "../shared/DatePickerInput";
import { useSuppliers } from "../../contexts/SupplierContext";

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
  const { suppliers, addSupplier } = useSuppliers();
  const [formData, setFormData] = useState({
    invoiceNumber: invoice?.invoiceNumber || "",
    amount: invoice?.amount || "",
    dueDate: invoice?.dueDate ? new Date(invoice.dueDate) : null,
    status: invoice?.status || "draft",
    selectedSupplierId:
      suppliers.find((s) => s.name === invoice?.supplier.name)?.id || "",
  });

  const [showNewSupplier, setShowNewSupplier] = useState(false);
  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: "",
    email: "",
    phone: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let supplierData;
    if (showNewSupplier) {
      const newSupplierData: Supplier = {
        id: Date.now().toString(),
        name: newSupplier.name || "",
        email: newSupplier.email || "",
        phone: newSupplier.phone,
        category: newSupplier.category,
      };

      addSupplier(newSupplierData);

      supplierData = {
        name: newSupplierData.name,
        email: newSupplierData.email,
        phone: newSupplierData.phone,
      };
    } else {
      const selectedSupplier = suppliers.find(
        (s) => s.id === formData.selectedSupplierId
      );
      if (!selectedSupplier) {
        return;
      }

      supplierData = {
        name: selectedSupplier.name,
        email: selectedSupplier.email,
        phone: selectedSupplier.phone,
      };
    }

    onSave({
      invoiceNumber: formData.invoiceNumber,
      amount: Number(formData.amount),
      dueDate: formData.dueDate || undefined,
      status: formData.status as Invoice["status"],
      supplier: supplierData,
    });

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Invoice" : "New Invoice"}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-4">
            <h6 className="mb-3">Invoice Details</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Invoice Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        invoiceNumber: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              </Col>
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
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <DatePickerInput
                selected={formData.dueDate}
                onChange={(date) => setFormData({ ...formData, dueDate: date })}
                required
              />
            </Form.Group>

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

          <div>
            <h6 className="mb-3">Supplier</h6>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                label="Select Existing Supplier"
                name="supplierType"
                checked={!showNewSupplier}
                onChange={() => setShowNewSupplier(false)}
              />
              <Form.Check
                type="radio"
                label="Add New Supplier"
                name="supplierType"
                checked={showNewSupplier}
                onChange={() => setShowNewSupplier(true)}
              />
            </Form.Group>

            {!showNewSupplier ? (
              <Form.Group>
                <Form.Select
                  value={formData.selectedSupplierId}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      selectedSupplierId: e.target.value,
                    });
                  }}
                  required
                >
                  <option value="">Select a supplier...</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name} ({supplier.category})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            ) : (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Supplier Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newSupplier.name}
                    onChange={(e) =>
                      setNewSupplier({ ...newSupplier, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={newSupplier.email}
                    onChange={(e) =>
                      setNewSupplier({ ...newSupplier, email: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone (Optional)</Form.Label>
                      <Form.Control
                        type="tel"
                        value={newSupplier.phone}
                        onChange={(e) =>
                          setNewSupplier({
                            ...newSupplier,
                            phone: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        value={newSupplier.category}
                        onChange={(e) =>
                          setNewSupplier({
                            ...newSupplier,
                            category: e.target.value,
                          })
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
                  </Col>
                </Row>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? "Save Changes" : "Create Invoice"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default InvoiceModal;
