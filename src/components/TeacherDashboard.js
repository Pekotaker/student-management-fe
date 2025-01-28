import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import TeacherScores from "../roles/TeacherScores";

function TeacherDashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Teacher Dashboard
      </Typography>
      <Button variant="contained" component={Link} to="scores">
        Update Scores
      </Button>

      <Routes>
        <Route path="scores" element={<TeacherScores />} />
        <Route
          path="*"
          element={
            <Typography mt={2}>Choose a teacher action above.</Typography>
          }
        />
      </Routes>
    </Container>
  );
}

export default TeacherDashboard;
