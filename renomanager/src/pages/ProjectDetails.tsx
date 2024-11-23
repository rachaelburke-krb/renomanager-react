import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Badge,
  Accordion,
  Button,
  Table,
} from "react-bootstrap";
import { format } from "date-fns";
import { Project, Invoice, InvoiceSummary, Phase, Task } from "../types";
import EditProjectModal from "../components/projects/EditProjectModal";
import DeleteProjectModal from "../components/projects/DeleteProjectModal";
import PhaseModal from "../components/projects/PhaseModal";
import TaskModal from "../components/projects/TaskModal";
import InvoiceModal from "../components/projects/InvoiceModal";
import PhotoGallery from "../components/projects/PhotoGallery";
import { useProjects } from "../contexts/ProjectContext";
import { mockSuppliers } from "../data/mockSuppliers";

// Helper function to calculate invoice summaries
const calculateInvoiceSummary = (invoices: Invoice[]): InvoiceSummary => {
  return invoices.reduce(
    (summary, invoice) => {
      const amount = invoice.amount;
      summary.total += amount;
      if (invoice.status === "paid") {
        summary.paid += amount;
      } else {
        summary.unpaid += amount;
      }
      return summary;
    },
    { total: 0, paid: 0, unpaid: 0 }
  );
};

interface SupplierSummary {
  name: string;
  category?: string;
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
  invoiceCount: number;
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProject, deleteProject, updateProject } = useProjects();
  const [project, setProject] = useState<Project | null>(
    getProject(id || "") || null
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPhaseModal, setShowPhaseModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingPhase, setEditingPhase] = useState<Phase | null>(null);
  const [editingTask, setEditingTask] = useState<{
    task: Task;
    phaseId: string;
  } | null>(null);
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<{
    invoice: Invoice;
    taskId: string;
    phaseId: string;
  } | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<{
    taskId: string;
    phaseId: string;
  } | null>(null);

  if (!project) {
    return <div>Project not found</div>;
  }

  const getStatusVariant = (status: Project["status"]) => {
    switch (status) {
      case "planning":
        return "info";
      case "in-progress":
        return "warning";
      case "completed":
        return "success";
      default:
        return "secondary";
    }
  };

  // Calculate project totals
  const projectSummary = project.phases
    .flatMap((phase) => phase.tasks)
    .flatMap((task) => task.invoices)
    .reduce(
      (summary, invoice) => {
        const amount = invoice.amount;
        summary.total += amount;
        if (invoice.status === "paid") {
          summary.paid += amount;
        } else {
          summary.unpaid += amount;
        }
        return summary;
      },
      { total: 0, paid: 0, unpaid: 0 }
    );

  const handleEditProject = (updatedProject: Project) => {
    // TODO: Implement API call to update project
    console.log("Updating project:", updatedProject);
    // For now, just close the modal
    setShowEditModal(false);
  };

  const handleDelete = () => {
    if (project) {
      deleteProject(project.id);
      navigate("/dashboard");
    }
  };

  const handleAddPhase = (newPhase: Partial<Phase>) => {
    if (!project) return;

    const phase: Phase = {
      id: Date.now().toString(),
      ...newPhase,
      tasks: [],
    } as Phase;

    const updatedProject = {
      ...project,
      phases: [...project.phases, phase],
    };

    setProject(updatedProject);
    updateProject(updatedProject);
    setShowPhaseModal(false);
  };

  const handleEditPhase = (updatedPhase: Partial<Phase>) => {
    if (!project || !editingPhase) return;

    const updatedProject = {
      ...project,
      phases: project.phases.map((phase) =>
        phase.id === editingPhase.id ? { ...phase, ...updatedPhase } : phase
      ),
    };

    setProject(updatedProject);
    updateProject(updatedProject);
    setEditingPhase(null);
  };

  const handleDeletePhase = (phaseId: string) => {
    if (!project) return;

    const updatedProject = {
      ...project,
      phases: project.phases.filter((phase) => phase.id !== phaseId),
    };

    setProject(updatedProject);
    updateProject(updatedProject);
  };

  const handleAddTask = (phaseId: string, newTask: Partial<Task>) => {
    if (!project) return;

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      invoices: [],
    } as Task;

    const updatedProject = {
      ...project,
      phases: project.phases.map((phase) =>
        phase.id === phaseId
          ? { ...phase, tasks: [...phase.tasks, task] }
          : phase
      ),
    };

    setProject(updatedProject);
    updateProject(updatedProject);
    setShowTaskModal(false);
    setActivePhaseId(null);
  };

  const handleEditTask = (
    phaseId: string,
    taskId: string,
    updatedTask: Partial<Task>
  ) => {
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === phaseId
            ? {
                ...phase,
                tasks: phase.tasks.map((task) =>
                  task.id === taskId ? { ...task, ...updatedTask } : task
                ),
              }
            : phase
        ),
      };
    });

    setEditingTask(null);
  };

  const handleDeleteTask = (phaseId: string, taskId: string) => {
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === phaseId
            ? {
                ...phase,
                tasks: phase.tasks.filter((task) => task.id !== taskId),
              }
            : phase
        ),
      };
    });
  };

  const handleAddInvoice = (
    phaseId: string,
    taskId: string,
    newInvoice: Partial<Invoice>
  ) => {
    const invoice: Invoice = {
      id: Date.now().toString(),
      ...newInvoice,
    } as Invoice;

    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === phaseId
            ? {
                ...phase,
                tasks: phase.tasks.map((task) =>
                  task.id === taskId
                    ? { ...task, invoices: [...task.invoices, invoice] }
                    : task
                ),
              }
            : phase
        ),
      };
    });

    setShowInvoiceModal(false);
    setActiveTaskId(null);
  };

  const handleEditInvoice = (
    phaseId: string,
    taskId: string,
    invoiceId: string,
    updatedInvoice: Partial<Invoice>
  ) => {
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === phaseId
            ? {
                ...phase,
                tasks: phase.tasks.map((task) =>
                  task.id === taskId
                    ? {
                        ...task,
                        invoices: task.invoices.map((invoice) =>
                          invoice.id === invoiceId
                            ? { ...invoice, ...updatedInvoice }
                            : invoice
                        ),
                      }
                    : task
                ),
              }
            : phase
        ),
      };
    });

    setEditingInvoice(null);
  };

  const handleDeleteInvoice = (
    phaseId: string,
    taskId: string,
    invoiceId: string
  ) => {
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === phaseId
            ? {
                ...phase,
                tasks: phase.tasks.map((task) =>
                  task.id === taskId
                    ? {
                        ...task,
                        invoices: task.invoices.filter(
                          (invoice) => invoice.id !== invoiceId
                        ),
                      }
                    : task
                ),
              }
            : phase
        ),
      };
    });
  };

  const handlePhotoUpload = (files: FileList) => {
    // TODO: Implement actual file upload
    const newPhotos = Array.from(files).map((file) => ({
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      uploadedAt: new Date(),
    }));

    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        photos: [...(prev.photos || []), ...newPhotos],
      };
    });
  };

  const handleDeletePhoto = (photoId: string) => {
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        photos: prev.photos.filter((photo) => photo.id !== photoId),
      };
    });
  };

  const handleUpdatePhotoCaption = (photoId: string, caption: string) => {
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        photos: prev.photos.map((photo) =>
          photo.id === photoId ? { ...photo, caption } : photo
        ),
      };
    });
  };

  // Add this function to calculate supplier summaries
  const calculateSupplierSummaries = (): SupplierSummary[] => {
    const supplierMap = new Map<string, SupplierSummary>();

    project.phases.forEach((phase) => {
      phase.tasks.forEach((task) => {
        task.invoices.forEach((invoice) => {
          const supplierName = invoice.supplier.name;
          const existing = supplierMap.get(supplierName) || {
            name: supplierName,
            category: mockSuppliers.find((s) => s.name === supplierName)
              ?.category,
            totalAmount: 0,
            paidAmount: 0,
            unpaidAmount: 0,
            invoiceCount: 0,
          };

          existing.totalAmount += invoice.amount;
          if (invoice.status === "paid") {
            existing.paidAmount += invoice.amount;
          } else {
            existing.unpaidAmount += invoice.amount;
          }
          existing.invoiceCount++;

          supplierMap.set(supplierName, existing);
        });
      });
    });

    return Array.from(supplierMap.values()).sort(
      (a, b) => b.totalAmount - a.totalAmount
    );
  };

  const supplierSummaries = calculateSupplierSummaries();

  return (
    <div className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <h2 className="mb-0 me-4">{project.title}</h2>
          <Badge bg={getStatusVariant(project.status)}>
            {project.status.replace("-", " ")}
          </Badge>
        </div>
        <div>
          <div
            role="button"
            className="text-primary me-2 d-inline-block"
            onClick={() => setShowEditModal(true)}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-pencil-square fs-5"></i>
          </div>
          <div
            role="button"
            className="text-danger d-inline-block"
            onClick={() => setShowDeleteModal(true)}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-trash fs-5"></i>
          </div>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row>
            <Col md={8}>
              <div className="mb-4">
                <h5 className="text-muted mb-3">Description</h5>
                <p className="mb-0">{project.description}</p>
              </div>
              <div>
                <h5 className="text-muted mb-3">Location</h5>
                <p className="mb-2">{project.location.address}</p>
                <div
                  className="bg-light rounded"
                  style={{
                    height: "200px",
                    backgroundImage:
                      'url("https://via.placeholder.com/800x600/e9ecef/495057?text=Map+Placeholder")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            </Col>
            <Col md={4} className="border-start">
              <div className="mb-4">
                <h5 className="text-muted mb-3">Timeline</h5>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-calendar me-2"></i>
                  <span>
                    {format(new Date(project.startDate), "MMM d, yyyy")} -{" "}
                    {format(new Date(project.endDate), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-muted mb-3">Progress</h5>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-list-task me-2"></i>
                  <span>{project.phases.length} Phases</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-people me-2"></i>
                  <span>
                    {project.sharedWith.length > 0
                      ? `${project.sharedWith.length} Team Members`
                      : "No team members"}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="text-muted mb-3">Budget</h5>
                <div className="ms-1">
                  <div className="mb-2">
                    <strong>Total:</strong> $
                    {projectSummary.total.toLocaleString()}
                  </div>
                  <div className="mb-2 text-success">
                    <strong>Paid:</strong> $
                    {projectSummary.paid.toLocaleString()}
                  </div>
                  <div className="text-danger">
                    <strong>Unpaid:</strong> $
                    {projectSummary.unpaid.toLocaleString()}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Photo Gallery */}
      <Row className="mb-4">
        <Col xs={12}>
          <PhotoGallery
            photos={project.photos || []}
            onUpload={handlePhotoUpload}
            onDelete={handleDeletePhoto}
            onUpdateCaption={handleUpdatePhotoCaption}
          />
        </Col>
      </Row>

      {/* Phases Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Project Phases</h3>
          <Button variant="primary" onClick={() => setShowPhaseModal(true)}>
            <i className="bi bi-plus-lg me-2"></i>
            Add Phase
          </Button>
        </div>

        <Accordion>
          {project.phases.map((phase) => {
            const phaseSummary = calculateInvoiceSummary(
              phase.tasks.flatMap((task) => task.invoices)
            );

            return (
              <Accordion.Item
                key={phase.id}
                eventKey={phase.id}
                className="mb-3"
              >
                <Accordion.Header>
                  <div className="d-flex justify-content-between align-items-center w-100 me-3">
                    <div className="d-flex align-items-center">
                      <h5 className="mb-0 me-3">{phase.title}</h5>
                      <Badge
                        bg={getStatusVariant(phase.status)}
                        className="me-3"
                      >
                        {phase.status.replace("-", " ")}
                      </Badge>
                      <small className="text-muted">
                        {phase.tasks.length} tasks · $
                        {phaseSummary.total.toLocaleString()}
                      </small>
                    </div>
                    <div>
                      <div
                        role="button"
                        className="text-primary p-0 me-3 d-inline-block"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPhase(phase);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="bi bi-pencil"></i>
                      </div>
                      <div
                        role="button"
                        className="text-danger p-0 d-inline-block"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            window.confirm(
                              "Are you sure you want to delete this phase?"
                            )
                          ) {
                            handleDeletePhase(phase.id);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="bi bi-trash"></i>
                      </div>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="bg-light">
                  <p className="lead mb-4">{phase.description}</p>

                  {/* Tasks */}
                  {phase.tasks.map((task) => {
                    const taskSummary = calculateInvoiceSummary(task.invoices);

                    return (
                      <Card key={task.id} className="mb-3 border-0 shadow-sm">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <h6 className="mb-0">{task.title}</h6>
                                <small className="text-muted">
                                  {task.assignedTo &&
                                    `Assigned to ${task.assignedTo} · `}
                                  ${taskSummary.total.toLocaleString()} total
                                </small>
                              </div>
                              <Badge bg={getStatusVariant(task.status)}>
                                {task.status.replace("-", " ")}
                              </Badge>
                            </div>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => {
                                  setActiveTaskId({
                                    taskId: task.id,
                                    phaseId: phase.id,
                                  });
                                  setShowInvoiceModal(true);
                                }}
                              >
                                <i className="bi bi-plus-lg me-1"></i>
                                Add Invoice
                              </Button>
                              <Button
                                variant="link"
                                className="text-primary p-0 me-2"
                                onClick={() =>
                                  setEditingTask({ task, phaseId: phase.id })
                                }
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="link"
                                className="text-danger p-0"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Are you sure you want to delete this task?"
                                    )
                                  ) {
                                    handleDeleteTask(phase.id, task.id);
                                  }
                                }}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </div>

                          {task.invoices.length > 0 && (
                            <div className="mt-2 pt-2 border-top">
                              <div className="row g-2">
                                {task.invoices.map((invoice) => (
                                  <div key={invoice.id} className="col-12">
                                    <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                                      <div>
                                        <small className="d-block">
                                          <strong>
                                            {invoice.invoiceNumber}
                                          </strong>{" "}
                                          - {invoice.supplier.name}
                                        </small>
                                        <small className="text-muted">
                                          Due:{" "}
                                          {format(
                                            new Date(invoice.dueDate),
                                            "MMM d, yyyy"
                                          )}
                                        </small>
                                      </div>
                                      <div className="d-flex align-items-center">
                                        <span
                                          className={`me-3 ${
                                            invoice.status === "paid"
                                              ? "text-success"
                                              : "text-danger"
                                          }`}
                                        >
                                          ${invoice.amount.toLocaleString()}
                                        </span>
                                        <Badge
                                          bg={
                                            invoice.status === "paid"
                                              ? "success"
                                              : "warning"
                                          }
                                          className="me-2"
                                        >
                                          {invoice.status}
                                        </Badge>
                                        <Button
                                          variant="link"
                                          className="text-primary p-0 me-1"
                                          onClick={() =>
                                            setEditingInvoice({
                                              invoice,
                                              taskId: task.id,
                                              phaseId: phase.id,
                                            })
                                          }
                                        >
                                          <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button
                                          variant="link"
                                          className="text-danger p-0"
                                          onClick={() => {
                                            if (
                                              window.confirm(
                                                "Are you sure you want to delete this invoice?"
                                              )
                                            ) {
                                              handleDeleteInvoice(
                                                phase.id,
                                                task.id,
                                                invoice.id
                                              );
                                            }
                                          }}
                                        >
                                          <i className="bi bi-trash"></i>
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    );
                  })}

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => {
                      setActivePhaseId(phase.id);
                      setShowTaskModal(true);
                    }}
                  >
                    <i className="bi bi-plus-lg me-2"></i>
                    Add Task
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>

      {/* Modals */}
      <EditProjectModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        project={project}
        onSave={handleEditProject}
      />

      <DeleteProjectModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        projectTitle={project?.title || ""}
      />

      <PhaseModal
        show={showPhaseModal}
        onHide={() => setShowPhaseModal(false)}
        onSave={handleAddPhase}
      />

      {editingPhase && (
        <PhaseModal
          show={true}
          onHide={() => setEditingPhase(null)}
          onSave={handleEditPhase}
          phase={editingPhase}
          isEditing
        />
      )}

      <TaskModal
        show={showTaskModal}
        onHide={() => {
          setShowTaskModal(false);
          setActivePhaseId(null);
        }}
        onSave={(task) => handleAddTask(activePhaseId!, task)}
      />

      {editingTask && (
        <TaskModal
          show={true}
          onHide={() => setEditingTask(null)}
          onSave={(updatedTask) =>
            handleEditTask(
              editingTask.phaseId,
              editingTask.task.id,
              updatedTask
            )
          }
          task={editingTask.task}
          isEditing
        />
      )}

      <InvoiceModal
        show={showInvoiceModal}
        onHide={() => {
          setShowInvoiceModal(false);
          setActiveTaskId(null);
        }}
        onSave={(invoice) =>
          activeTaskId &&
          handleAddInvoice(activeTaskId.phaseId, activeTaskId.taskId, invoice)
        }
      />

      {editingInvoice && (
        <InvoiceModal
          show={true}
          onHide={() => setEditingInvoice(null)}
          onSave={(updatedInvoice) =>
            handleEditInvoice(
              editingInvoice.phaseId,
              editingInvoice.taskId,
              editingInvoice.invoice.id,
              updatedInvoice
            )
          }
          invoice={editingInvoice.invoice}
          isEditing
        />
      )}

      {/* Add this after the Phases section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Supplier Summary</h3>
        </div>

        <Card>
          <Card.Body>
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Category</th>
                    <th>Invoices</th>
                    <th className="text-end">Total Amount</th>
                    <th className="text-end">Paid</th>
                    <th className="text-end">Outstanding</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierSummaries.map((summary) => (
                    <tr key={summary.name}>
                      <td>
                        <div className="fw-medium">{summary.name}</div>
                      </td>
                      <td>
                        {summary.category && (
                          <Badge bg="secondary" className="text-capitalize">
                            {summary.category}
                          </Badge>
                        )}
                      </td>
                      <td>{summary.invoiceCount} invoices</td>
                      <td className="text-end fw-medium">
                        ${summary.totalAmount.toLocaleString()}
                      </td>
                      <td className="text-end text-success">
                        ${summary.paidAmount.toLocaleString()}
                      </td>
                      <td className="text-end text-danger">
                        ${summary.unpaidAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="table-light fw-bold">
                    <td colSpan={3}>Total</td>
                    <td className="text-end">
                      $
                      {supplierSummaries
                        .reduce((sum, s) => sum + s.totalAmount, 0)
                        .toLocaleString()}
                    </td>
                    <td className="text-end text-success">
                      $
                      {supplierSummaries
                        .reduce((sum, s) => sum + s.paidAmount, 0)
                        .toLocaleString()}
                    </td>
                    <td className="text-end text-danger">
                      $
                      {supplierSummaries
                        .reduce((sum, s) => sum + s.unpaidAmount, 0)
                        .toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
