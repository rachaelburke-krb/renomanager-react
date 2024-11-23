import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import { ProjectProvider } from "./contexts/ProjectContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Profile from "./pages/Profile";
import { UserProvider } from "./contexts/UserContext";
import { SupplierProvider } from "./contexts/SupplierContext";
import Suppliers from "./pages/Suppliers";

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <UserProvider>
      <SupplierProvider>
        <ProjectProvider>
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/projects/new" element={<NewProject />} />
                        <Route
                          path="/projects/:id"
                          element={<ProjectDetails />}
                        />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                          path="/"
                          element={<Navigate to="/dashboard" replace />}
                        />
                        <Route path="/suppliers" element={<Suppliers />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ProjectProvider>
      </SupplierProvider>
    </UserProvider>
  );
};

export default App;
