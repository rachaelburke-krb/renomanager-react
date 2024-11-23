import React, { useState } from "react";
import { Modal, Form, Button, ListGroup, Badge } from "react-bootstrap";
import { User } from "../../types";
import { mockUsers } from "../../data/mockUsers";

interface ShareProjectModalProps {
  show: boolean;
  onHide: () => void;
  onShare: (userIds: string[]) => void;
  currentSharedWith: string[];
  owner: User;
}

const ShareProjectModal: React.FC<ShareProjectModalProps> = ({
  show,
  onHide,
  onShare,
  currentSharedWith,
  owner,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] =
    useState<string[]>(currentSharedWith);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShare(selectedUsers);
    onHide();
  };

  const handleAddUser = () => {
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      setError("User not found");
      return;
    }
    if (user.id === owner.id) {
      setError("You can't share with the project owner");
      return;
    }
    if (selectedUsers.includes(user.id)) {
      setError("User already has access");
      return;
    }

    setSelectedUsers([...selectedUsers, user.id]);
    setEmail("");
    setError("");
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((id) => id !== userId));
  };

  const getSharedUsers = () => {
    return selectedUsers
      .map((userId) => mockUsers.find((u) => u.id === userId))
      .filter((user): user is User => user !== undefined);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Share Project</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Add User by Email</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  isInvalid={!!error}
                />
                <Button onClick={handleAddUser} variant="outline-primary">
                  Add
                </Button>
              </div>
              {error && <Form.Text className="text-danger">{error}</Form.Text>}
            </Form.Group>

            <div>
              <h6 className="mb-3">Project Access</h6>
              <ListGroup>
                <ListGroup.Item className="d-flex align-items-center">
                  <div
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                    style={{ width: "32px", height: "32px" }}
                  >
                    {owner.profileImage ? (
                      <img
                        src={owner.profileImage}
                        alt={owner.name}
                        className="rounded-circle"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span className="text-white">
                        {owner.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    )}
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-medium">{owner.name}</div>
                    <small className="text-muted">{owner.email}</small>
                  </div>
                  <Badge bg="primary">Owner</Badge>
                </ListGroup.Item>
                {getSharedUsers().map((user) => (
                  <ListGroup.Item
                    key={user.id}
                    className="d-flex align-items-center"
                  >
                    <div
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                      style={{ width: "32px", height: "32px" }}
                    >
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="rounded-circle"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <span className="text-white">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-medium">{user.name}</div>
                      <small className="text-muted">{user.email}</small>
                    </div>
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
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

export default ShareProjectModal;
