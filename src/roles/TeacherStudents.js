import React, { useState, useEffect } from "react";
import { addTeacherScore, getTeacherStudents } from "../services/api";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Container,
  Tab,
} from "@mui/material";

function TeacherScores() {
  const [teacherId, setTeacherId] = useState(null);
  const [students, setStudents] = useState([]); // all students across classes
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [message, setMessage] = useState("");

  // Decode teacher_id from the JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const [, payloadB64] = token.split(".");
      if (payloadB64) {
        const rawPayload = atob(payloadB64);
        const payload = JSON.parse(rawPayload);
        if (payload.user_id) {
          setTeacherId(payload.user_id);
        }
      }
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, []);

  // Whenever teacherId is set, fetch the list of assigned students
  useEffect(() => {
    async function fetchStudents() {
      try {
        if (!teacherId) return;
        const token = localStorage.getItem("token");
        const response = await getTeacherStudents(teacherId, token);
        setStudents(response.data); // Array of { student_id, user_id, student_name, class_id }
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    }
    fetchStudents();
  }, [teacherId]);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Students Assigned to You
      </Typography>
      {message && <Typography sx={{ color: "green", mb: 2 }}>{message}</Typography>}

      {/* Table of all assigned students */}
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Class ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow
                key={`${s.student_id}-${s.class_id}`}
                hover
                onClick={() => {
                  // Clicking a row can auto-select that student for adding a score
                  setSelectedStudentId(s.student_id.toString());
                }}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedStudentId === s.student_id.toString()
                      ? "#e3f2fd"
                      : "transparent",
                }}
              >
                <TableCell>{s.student_id}</TableCell>
                <TableCell>{s.student_name}</TableCell>
                <TableCell>{s.class_id}</TableCell>
                <TableCell>{s.class_name}</TableCell>
                <TableCell>{s.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Simple form to add a score to the selected student */}

    </Container>
  );
}

export default TeacherScores;
