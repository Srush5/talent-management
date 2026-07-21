import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import AddCandidate from "./pages/AddCandidate";
import EditCandidate from "./pages/EditCandidate";
import CandidateDetails from "./pages/CandidateDetails";
import Pipeline from "./pages/Pipeline";
import Interviews from "./pages/Interviews";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { isAuthenticated } from "./utils/authStorage";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route
            path="candidates"
            element={
              <ProtectedRoute allowedRoles={["recruiter"]}>
                <Candidates />
              </ProtectedRoute>
            }
          />

          <Route
            path="candidates/add"
            element={
              <ProtectedRoute allowedRoles={["recruiter"]}>
                <AddCandidate />
              </ProtectedRoute>
            }
          />

          <Route
            path="candidates/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["recruiter"]}>
                <EditCandidate />
              </ProtectedRoute>
            }
          />

          <Route
            path="candidates/:id"
            element={
              <ProtectedRoute allowedRoles={["recruiter", "interviewer"]}>
                <CandidateDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="application-status"
            element={
              <ProtectedRoute allowedRoles={["recruiter"]}>
                <Pipeline />
              </ProtectedRoute>
            }
          />

          <Route
            path="interviews"
            element={
              <ProtectedRoute allowedRoles={["recruiter", "interviewer"]}>
                <Interviews />
              </ProtectedRoute>
            }
          />

          <Route
            path="settings"
            element={
              <ProtectedRoute allowedRoles={["recruiter", "interviewer"]}>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;