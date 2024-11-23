import React, { useState } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";
import FileUpload from "../components/shared/FileUpload";
import { useUser } from "../contexts/UserContext";

const Profile: React.FC = () => {
  const { currentUser, updateUser, updateProfileImage } = useUser();
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    language: currentUser?.language || "en",
    timezone: currentUser?.timezone || "UTC",
    emailNotifications: currentUser?.emailNotifications || false,
    twoFactor: currentUser?.twoFactor || false,
  });

  const handleProfileImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      updateProfileImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      updateUser({
        ...currentUser,
        ...formData,
      });
    }
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Profile Settings</h2>

      <Row>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <div className="position-relative d-inline-block mb-3">
                <FileUpload onFileSelect={handleProfileImageUpload}>
                  <div
                    className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto position-relative profile-image-container"
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundImage: currentUser?.profileImage
                        ? `url(${currentUser.profileImage})`
                        : `url('https://ui-avatars.com/api/?name=${formData.name}&size=150&background=0D6EFD&color=fff')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="profile-image-overlay">
                      <i className="bi bi-camera fs-4 text-white"></i>
                    </div>
                  </div>
                </FileUpload>
              </div>
              <h5 className="mb-1">{formData.name}</h5>
              <p className="text-muted mb-3">{formData.email}</p>
              <div className="d-flex justify-content-center gap-2">
                <Button variant="outline-primary" size="sm">
                  <i className="bi bi-pencil me-2"></i>
                  Edit Profile
                </Button>
                <Button variant="outline-danger" size="sm">
                  <i className="bi bi-trash me-2"></i>
                  Delete Account
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card>
            <Card.Body>
              <h5 className="mb-4">Account Settings</h5>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
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
                  </Col>
                  <Col md={6}>
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
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Timezone</Form.Label>
                  <Form.Select
                    value={formData.timezone}
                    onChange={(e) =>
                      setFormData({ ...formData, timezone: e.target.value })
                    }
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time</option>
                    <option value="CST">Central Time</option>
                    <option value="PST">Pacific Time</option>
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

                <div className="mt-4">
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
