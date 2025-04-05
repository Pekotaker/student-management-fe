import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import TeacherScores from "../roles/TeacherScores";
import TeacherStudents from "../roles/TeacherStudents";
import TeacherClasses from "../roles/TeacherClasses";

function TeacherDashboard() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Teacher Dashboard
      </Typography>
      <Button variant="contained" component={Link} to="scores">
        Update Scores
      </Button>
      <Button variant="contained" component={Link} to="students" sx={{ ml: 2 }}>
        View Students
      </Button>
      <Button variant="contained" component={Link} to="classes" sx={{ ml: 2 }}>
        View Classes
      </Button>


      <Routes>
        <Route path="scores" element={<TeacherScores />} />
        <Route
          path="*"
          element={
            <Typography mt={2}>Choose a teacher action above.</Typography>
          }
        />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="classes" element={<TeacherClasses />} />
      </Routes>
    </Container>
  );
}

export default TeacherDashboard;
