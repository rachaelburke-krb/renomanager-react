import React, { useState } from "react";
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { ProjectPhoto } from "../../types";

interface PhotoGalleryProps {
  photos: ProjectPhoto[];
  onUpload: (files: FileList) => void;
  onDelete: (photoId: string) => void;
  onUpdateCaption: (photoId: string, caption: string) => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onUpload,
  onDelete,
  onUpdateCaption,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ProjectPhoto | null>(null);
  const [editingCaption, setEditingCaption] = useState(false);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  const handleSaveCaption = () => {
    if (selectedPhoto) {
      onUpdateCaption(selectedPhoto.id, caption);
      setEditingCaption(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Card.Title>Project Photos</Card.Title>
            <div>
              <Button variant="primary">
                <i className="bi bi-cloud-upload me-2"></i>
                <label className="mb-0" style={{ cursor: "pointer" }}>
                  Upload Photos
                  <input
                    type="file"
                    className="d-none"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </Button>
            </div>
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-images fs-1 mb-3 d-block"></i>
              <p className="mb-0">No photos uploaded yet</p>
            </div>
          ) : (
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {photos.map((photo) => (
                <Col key={photo.id}>
                  <div
                    className="photo-card position-relative"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedPhoto(photo);
                      setCaption(photo.caption || "");
                    }}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || "Project photo"}
                      className="img-fluid rounded"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    {photo.caption && (
                      <div className="photo-caption position-absolute bottom-0 start-0 end-0 p-2 bg-dark bg-opacity-50 text-white rounded-bottom">
                        <small>{photo.caption}</small>
                      </div>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Photo Detail Modal */}
      <Modal
        show={selectedPhoto !== null}
        onHide={() => {
          setSelectedPhoto(null);
          setEditingCaption(false);
        }}
        size="lg"
      >
        {selectedPhoto && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Photo Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || "Project photo"}
                className="img-fluid rounded mb-3"
                style={{ width: "100%" }}
              />

              {editingCaption ? (
                <Form.Group>
                  <Form.Label>Caption</Form.Label>
                  <Form.Control
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Add a caption..."
                  />
                </Form.Group>
              ) : (
                <p className="mb-0">
                  {selectedPhoto.caption || "No caption added"}
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-danger"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this photo?"
                    )
                  ) {
                    onDelete(selectedPhoto.id);
                    setSelectedPhoto(null);
                  }
                }}
              >
                Delete Photo
              </Button>
              {editingCaption ? (
                <Button variant="primary" onClick={handleSaveCaption}>
                  Save Caption
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => setEditingCaption(true)}
                >
                  Edit Caption
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default PhotoGallery;
