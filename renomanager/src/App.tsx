import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProjectDetails from "./pages/ProjectDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/projects/:id" element={<ProjectDetails />} />
                  <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
