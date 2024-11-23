import React, { useState } from "react";
import {
  Container,
  Table,
  Badge,
  Button,
  Card,
  Accordion,
} from "react-bootstrap";
import { format } from "date-fns";
import { useSuppliers } from "../contexts/SupplierContext";
import { useProjects } from "../contexts/ProjectContext";
import SupplierModal from "../components/suppliers/SupplierModal";
import { Supplier } from "../types";

type SortField =
  | "name"
  | "category"
  | "total"
  | "paid"
  | "unpaid"
  | "invoiceCount";
type SortDirection = "asc" | "desc";

const Suppliers: React.FC = () => {
  const { suppliers } = useSuppliers();
  const { projects } = useProjects();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) {
      return <i className="bi bi-arrow-down-up text-muted ms-1"></i>;
    }
    return sortDirection === "asc" ? (
      <i className="bi bi-sort-down text-primary ms-1"></i>
    ) : (
      <i className="bi bi-sort-up text-primary ms-1"></i>
    );
  };

  // Get all invoices for a supplier
  const getSupplierInvoices = (supplierName: string) => {
    return projects
      .flatMap((project) =>
        project.phases.flatMap((phase) =>
          phase.tasks.flatMap((task) =>
            task.invoices
              .filter((invoice) => invoice.supplier.name === supplierName)
              .map((invoice) => ({
                ...invoice,
                project: {
                  id: project.id,
                  title: project.title,
                },
                task: {
                  title: task.title,
                  phase: phase.title,
                },
              }))
          )
        )
      )
      .sort(
        (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      );
  };

  // Calculate supplier totals
  const calculateSupplierTotals = (supplierName: string) => {
    const invoices = getSupplierInvoices(supplierName);
    return {
      total: invoices.reduce((sum, invoice) => sum + invoice.amount, 0),
      paid: invoices.reduce(
        (sum, invoice) =>
          sum + (invoice.status === "paid" ? invoice.amount : 0),
        0
      ),
      unpaid: invoices.reduce(
        (sum, invoice) =>
          sum + (invoice.status !== "paid" ? invoice.amount : 0),
        0
      ),
      invoiceCount: invoices.length,
    };
  };

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    const totalsA = calculateSupplierTotals(a.name);
    const totalsB = calculateSupplierTotals(b.name);

    switch (sortField) {
      case "name":
        return multiplier * a.name.localeCompare(b.name);
      case "category":
        return multiplier * (a.category || "").localeCompare(b.category || "");
      case "total":
        return multiplier * (totalsA.total - totalsB.total);
      case "paid":
        return multiplier * (totalsA.paid - totalsB.paid);
      case "unpaid":
        return multiplier * (totalsA.unpaid - totalsB.unpaid);
      case "invoiceCount":
        return multiplier * (totalsA.invoiceCount - totalsB.invoiceCount);
      default:
        return 0;
    }
  });

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Suppliers</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-plus-lg me-2"></i>
          Add Supplier
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  style={{ cursor: "pointer" }}
                >
                  Name {getSortIcon("name")}
                </th>
                <th
                  onClick={() => handleSort("category")}
                  style={{ cursor: "pointer" }}
                >
                  Category {getSortIcon("category")}
                </th>
                <th>Contact</th>
                <th
                  onClick={() => handleSort("invoiceCount")}
                  style={{ cursor: "pointer" }}
                  className="text-end"
                >
                  Invoices {getSortIcon("invoiceCount")}
                </th>
                <th
                  onClick={() => handleSort("total")}
                  style={{ cursor: "pointer" }}
                  className="text-end"
                >
                  Total Amount {getSortIcon("total")}
                </th>
                <th
                  onClick={() => handleSort("paid")}
                  style={{ cursor: "pointer" }}
                  className="text-end"
                >
                  Paid {getSortIcon("paid")}
                </th>
                <th
                  onClick={() => handleSort("unpaid")}
                  style={{ cursor: "pointer" }}
                  className="text-end"
                >
                  Outstanding {getSortIcon("unpaid")}
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedSuppliers.map((supplier) => {
                const totals = calculateSupplierTotals(supplier.name);
                return (
                  <React.Fragment key={supplier.id}>
                    <tr>
                      <td>
                        <div className="fw-medium">{supplier.name}</div>
                      </td>
                      <td>
                        <Badge bg="secondary" className="text-capitalize">
                          {supplier.category}
                        </Badge>
                      </td>
                      <td>
                        <div>{supplier.email}</div>
                        {supplier.phone && (
                          <small className="text-muted">{supplier.phone}</small>
                        )}
                      </td>
                      <td className="text-end fw-medium">
                        {totals.invoiceCount}
                      </td>
                      <td className="text-end fw-medium">
                        ${totals.total.toLocaleString()}
                      </td>
                      <td className="text-end text-success">
                        ${totals.paid.toLocaleString()}
                      </td>
                      <td className="text-end text-danger">
                        ${totals.unpaid.toLocaleString()}
                      </td>
                      <td className="text-center">
                        <Button
                          variant="link"
                          className="text-primary p-0 me-2"
                          onClick={() => setEditingSupplier(supplier)}
                        >
                          <i className="bi bi-pencil"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7} className="p-0">
                        <Accordion flush>
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              <small>View Invoices</small>
                            </Accordion.Header>
                            <Accordion.Body>
                              <Table size="sm" className="mb-0">
                                <thead>
                                  <tr>
                                    <th>Invoice #</th>
                                    <th>Project</th>
                                    <th>Task</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th className="text-end">Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {getSupplierInvoices(supplier.name).map(
                                    (invoice) => (
                                      <tr key={invoice.id}>
                                        <td>{invoice.invoiceNumber}</td>
                                        <td>{invoice.project.title}</td>
                                        <td>
                                          {invoice.task.phase} -{" "}
                                          {invoice.task.title}
                                        </td>
                                        <td>
                                          {format(
                                            new Date(invoice.dueDate),
                                            "MMM d, yyyy"
                                          )}
                                        </td>
                                        <td>
                                          <Badge
                                            bg={
                                              invoice.status === "paid"
                                                ? "success"
                                                : invoice.status === "overdue"
                                                ? "danger"
                                                : "warning"
                                            }
                                          >
                                            {invoice.status}
                                          </Badge>
                                        </td>
                                        <td className="text-end">
                                          ${invoice.amount.toLocaleString()}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </Table>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <SupplierModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        onSave={() => {
          setShowAddModal(false);
          // Supplier context will handle the update
        }}
      />

      {editingSupplier && (
        <SupplierModal
          show={true}
          onHide={() => setEditingSupplier(null)}
          supplier={editingSupplier}
          onSave={() => {
            setEditingSupplier(null);
            // Supplier context will handle the update
          }}
          isEditing
        />
      )}
    </Container>
  );
};

export default Suppliers;
