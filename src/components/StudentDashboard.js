import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import StudentSchedule from "../roles/StudentSchedule";
import StudentScores from "../roles/StudentScores";
import StudentProfile from "../roles/StudentProfile";

function StudentDashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      <Button variant="contained" sx={{ mr: 1 }} component={Link} to="profile">
        Profile
      </Button>
      <Button variant="contained" sx={{ mr: 1 }} component={Link} to="scores">
        Scores
      </Button>
      <Button variant="contained" component={Link} to="schedule">
        Schedule
      </Button>

      <Routes>
        <Route path="profile" element={<StudentProfile />} />
        <Route path="scores" element={<StudentScores />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route
          path="*"
          element={<Typography mt={2}>Select a student view above.</Typography>}
        />
      </Routes>
    </Container>
  );
}

export default StudentDashboard;
