import React from "react";
import { Container } from "react-bootstrap";
import ProjectList from "../components/projects/ProjectList";
import { Project } from "../types";

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
    phases: [],
  },
  {
    id: "2",
    title: "Bathroom Update",
    description: "Master bathroom modernization",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-05-30"),
    location: {
      address: "456 Oak Ave, Town",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    sharedWith: ["user1", "user2"],
    status: "in-progress",
    phases: [],
  },
];

const Dashboard: React.FC = () => {
  return (
    <Container fluid>
      <h2 className="mb-4">My Projects</h2>
      <ProjectList projects={mockProjects} />
    </Container>
  );
};

export default Dashboard;
