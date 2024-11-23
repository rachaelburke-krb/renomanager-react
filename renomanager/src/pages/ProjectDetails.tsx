import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Badge,
  Accordion,
  Button,
  Container,
} from "react-bootstrap";
import { format } from "date-fns";
import { Project, Invoice, InvoiceSummary, Phase, Task } from "../types";
import EditProjectModal from "../components/projects/EditProjectModal";
import DeleteProjectModal from "../components/projects/DeleteProjectModal";
import PhaseModal from "../components/projects/PhaseModal";
import TaskModal from "../components/projects/TaskModal";
import InvoiceModal from "../components/projects/InvoiceModal";
import PhotoGallery from "../components/projects/PhotoGallery";

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

// Temporary mock data - replace with actual data fetching
const mockProjects: Project[] = [
  {
    id: "1",
    title: "Kitchen Renovation",
    description: "Complete kitchen remodel with new cabinets and appliances",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-05-15"),
    location: {
      address: "123 Main St, City",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    sharedWith: [],
    status: "planning",
    phases: [
      {
        id: "p1",
        title: "Demo",
        description: "Remove existing cabinets and appliances",
        startDate: new Date("2024-04-01"),
        endDate: new Date("2024-04-07"),
        status: "planning",
        tasks: [
          {
            id: "t1",
            title: "Remove Cabinets",
            description: "Carefully remove existing cabinets",
            status: "planning",
            invoices: [
              {
                id: "i1",
                supplier: {
                  name: "Demo Crew Inc",
                  email: "demo@example.com",
                  phone: "555-0123",
                },
                amount: 2500,
                dueDate: new Date("2024-04-15"),
                status: "paid",
                invoiceNumber: "INV-3342",
              },
            ],
          },
          {
            id: "t2",
            title: "Dispose of Materials",
            description: "Haul away old cabinets and debris",
            status: "planning",
            invoices: [
              {
                id: "i2",
                supplier: {
                  name: "Hauling Bros",
                  email: "hauling@example.com",
                },
                amount: 800,
                dueDate: new Date("2024-04-16"),
                status: "draft",
                invoiceNumber: "INV-0231",
              },
            ],
          },
        ],
      },
      {
        id: "p2",
        title: "Installation",
        description: "Install new cabinets and appliances",
        startDate: new Date("2024-04-08"),
        endDate: new Date("2024-04-21"),
        status: "planning",
        tasks: [
          {
            id: "t3",
            title: "Install Cabinets",
            description: "Install new custom cabinets",
            status: "planning",
            invoices: [
              {
                id: "i3",
                supplier: {
                  name: "Cabinet Pro LLC",
                  email: "cabinets@example.com",
                },
                amount: 12000,
                dueDate: new Date("2024-04-30"),
                status: "draft",
                invoiceNumber: "20249333",
              },
            ],
          },
        ],
      },
    ],
  },
];

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(
    mockProjects.find((p) => p.id === id) || null
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

  const handleDeleteProject = () => {
    // TODO: Implement API call to delete project
    console.log("Deleting project:", project.id);
    // Navigate back to dashboard after deletion
    navigate("/dashboard");
  };

  const handleAddPhase = (newPhase: Partial<Phase>) => {
    const phase: Phase = {
      id: Date.now().toString(), // temporary ID generation
      ...newPhase,
      tasks: [],
    } as Phase;

    // Update project with new phase
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: [...prev.phases, phase],
      };
    });

    setShowPhaseModal(false);
  };

  const handleEditPhase = (updatedPhase: Partial<Phase>) => {
    if (!editingPhase) return;

    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === editingPhase.id ? { ...phase, ...updatedPhase } : phase
        ),
      };
    });

    setEditingPhase(null);
  };

  const handleDeletePhase = (phaseId: string) => {
    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.filter((phase) => phase.id !== phaseId),
      };
    });
  };

  const handleAddTask = (phaseId: string, newTask: Partial<Task>) => {
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      invoices: [],
    } as Task;

    setProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        phases: prev.phases.map((phase) =>
          phase.id === phaseId
            ? { ...phase, tasks: [...phase.tasks, task] }
            : phase
        ),
      };
    });

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

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="pb-3 mb-4 border-bottom">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h1 className="h2 mb-0">{project.title}</h1>
            <p className="text-muted mb-0">
              {format(new Date(project.startDate), "MMM d, yyyy")} -{" "}
              {format(new Date(project.endDate), "MMM d, yyyy")}
            </p>
          </div>
          <div>
            <Button
              variant="outline-primary"
              className="me-2"
              onClick={() => setShowEditModal(true)}
            >
              <i className="bi bi-pencil me-2"></i>
              Edit Project
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <i className="bi bi-trash me-2"></i>
              Delete Project
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <Row className="mb-4 g-4">
        <Col lg={8}>
          <div className="bg-body-tertiary p-4 rounded">
            <h4 className="border-bottom pb-2 mb-3">Project Overview</h4>
            <p className="lead">{project.description}</p>
            <Row className="mt-4">
              <Col md={6}>
                <div className="mb-3">
                  <h6 className="text-muted mb-2">Status</h6>
                  <Badge bg={getStatusVariant(project.status)} className="fs-6">
                    {project.status.replace("-", " ")}
                  </Badge>
                </div>
              </Col>
              <Col md={6}>
                <div>
                  <h6 className="text-muted mb-2">Location</h6>
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
            </Row>
          </div>
        </Col>

        <Col lg={4}>
          <div className="bg-body-tertiary p-4 rounded">
            <h4 className="border-bottom pb-2 mb-3">Project Summary</h4>
            <div className="mb-3">
              <h6 className="text-muted mb-2">Phases</h6>
              <h3 className="mb-0">{project.phases.length}</h3>
            </div>
            <div className="mb-3">
              <h6 className="text-muted mb-2">Tasks</h6>
              <h3 className="mb-0">
                {project.phases.reduce(
                  (sum, phase) => sum + phase.tasks.length,
                  0
                )}
              </h3>
            </div>
            <div>
              <h6 className="text-muted mb-2">Budget</h6>
              <div className="fs-5">
                <div className="mb-1">
                  Total: ${projectSummary.total.toLocaleString()}
                </div>
                <div className="text-success mb-1">
                  Paid: ${projectSummary.paid.toLocaleString()}
                </div>
                <div className="text-danger">
                  Unpaid: ${projectSummary.unpaid.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

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
                      <Button
                        variant="link"
                        className="text-primary p-0 me-3"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingPhase(phase);
                        }}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="link"
                        className="text-danger p-0"
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
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
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
        onConfirm={handleDeleteProject}
        projectTitle={project.title}
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
    </Container>
  );
};

export default ProjectDetails;
