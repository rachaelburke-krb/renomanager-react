import React from "react";
import { Card } from "react-bootstrap";

interface LocationMapProps {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const LocationMap: React.FC<LocationMapProps> = ({ address }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Location</Card.Title>
        <p className="mb-3">{address}</p>
        <div
          className="bg-light rounded"
          style={{
            height: "300px",
            backgroundImage:
              'url("https://via.placeholder.com/800x600/e9ecef/495057?text=Map+Placeholder")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default LocationMap;
