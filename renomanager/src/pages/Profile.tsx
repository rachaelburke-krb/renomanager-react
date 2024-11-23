import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { useUser } from "../contexts/UserContext";

const Profile: React.FC = () => {
  const { currentUser, updateUser, deleteAccount, updatePassword } = useUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    language: currentUser?.language || "en",
    timezone: currentUser?.timezone || "UTC-5",
    emailNotifications: currentUser?.emailNotifications ?? true,
    twoFactor: currentUser?.twoFactor ?? false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: formData.name,
      email: formData.email,
    });
    setMessage({ type: "success", text: "Profile updated successfully!" });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "danger", text: "New passwords do not match!" });
      return;
    }

    const success = updatePassword(
      passwordData.currentPassword,
      passwordData.newPassword
    );
    if (success) {
      setMessage({ type: "success", text: "Password updated successfully!" });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setMessage({ type: "danger", text: "Current password is incorrect!" });
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Profile Settings</h2>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="card-title mb-4">Personal Information</h5>
              <Form>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        defaultValue={currentUser?.name}
                        placeholder="Enter your name"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        defaultValue={currentUser?.email}
                        placeholder="Enter your email"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter your phone number"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        plaintext
                        readOnly
                        defaultValue={
                          currentUser
                            ? currentUser.role.charAt(0).toUpperCase() +
                              currentUser.role.slice(1)
                            : ""
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <h5 className="card-title mb-4">Change Password</h5>
              <Form>
                <Row>
                  <Col lg={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter current password"
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            currentPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button
                        variant="primary"
                        type="submit"
                        onClick={handlePasswordChange}
                      >
                        Update Password
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="card-title mb-4">Profile Picture</h5>
              <div className="text-center">
                <div className="mb-4">
                  <img
                    src="https://github.com/mdo.png"
                    alt="Profile"
                    className="rounded-circle"
                    width="120"
                    height="120"
                  />
                </div>
                <div>
                  <Button variant="outline-primary" size="sm">
                    Change Picture
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">Account Settings</h5>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Account
                </Button>
              </div>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Select
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Time Zone</Form.Label>
                  <Form.Select
                    value={formData.timezone}
                    onChange={(e) =>
                      setFormData({ ...formData, timezone: e.target.value })
                    }
                  >
                    <option value="UTC-8">Pacific Time (PT)</option>
                    <option value="UTC-7">Mountain Time (MT)</option>
                    <option value="UTC-6">Central Time (CT)</option>
                    <option value="UTC-5">Eastern Time (ET)</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="email-notifications"
                    label="Email Notifications"
                    checked={formData.emailNotifications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        emailNotifications: e.target.checked,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    type="switch"
                    id="two-factor"
                    label="Two-factor Authentication"
                    checked={formData.twoFactor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        twoFactor: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Account Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-danger">Warning: This action cannot be undone!</p>
          <p>
            Are you sure you want to delete your account? All your projects and
            data will be permanently removed.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteAccount}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success/Error Message */}
      {message && (
        <Alert
          variant={message.type}
          className="position-fixed bottom-0 end-0 m-3"
          onClose={() => setMessage(null)}
          dismissible
        >
          {message.text}
        </Alert>
      )}
    </Container>
  );
};

export default Profile;
