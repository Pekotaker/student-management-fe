import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import AdminAssign from "../roles/AdminAssign";
import AdminSchedule from "../roles/AdminSchedule";

function AdminDashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button variant="contained" sx={{ mr: 2 }} component={Link} to="assign">
        Assign Teacher
      </Button>
      <Button variant="contained" component={Link} to="schedule">
        Create Schedule
      </Button>

      <Routes>
        <Route path="assign" element={<AdminAssign />} />
        <Route path="schedule" element={<AdminSchedule />} />
        <Route
          path="*"
          element={
            <Typography mt={2}>Select an admin feature above.</Typography>
          }
        />
      </Routes>
    </Container>
  );
}

export default AdminDashboard;
