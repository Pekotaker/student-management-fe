import React, { useState, useEffect } from "react";
import { addTeacherScore, getTeacherStudents } from "../services/api";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

function TeacherScores() {
  const [teacherId, setTeacherId] = useState(null); // or decode from JWT
  const [students, setStudents] = useState([]); // store fetched students
  const [selectedStudent, setSelectedStudent] = useState("");
  const [scoreValue, setScoreValue] = useState("");
  const [message, setMessage] = useState("");

  // We'll fetch the teacherId from localStorage, or you can decode the JWT token
  useEffect(() => {
    // const tId = localStorage.getItem("teacher_id");
    // Get teacher_id from token: decode JWT
    const token = localStorage.getItem("token");
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const payload = JSON.parse(rawPayload);
    const tId = payload.user_id;
    if (tId) {
      setTeacherId(tId);
    }
  }, []);

  // Whenever teacherId is set, fetch the list of assigned students
  useEffect(() => {
    async function fetchStudents() {
      try {
        if (!teacherId) return;
        const token = localStorage.getItem("token");
        const response = await getTeacherStudents(teacherId, token);
        setStudents(response.data);

        console.log(response.data);
      } catch (err) {
        console.error("Error fetching students", err);
      }
    }
    fetchStudents();
  }, [teacherId]);

  async function handleScore(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await addTeacherScore(
        {
          student_id: selectedStudent, // the ID from the select
          teacher_id: teacherId,
          score_value: scoreValue,
        },
        token
      );
      setMessage("Score added successfully");
    } catch (err) {
      setMessage("Error adding score");
    }
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Update / Add Scores
      </Typography>
      <form onSubmit={handleScore}>
        {/* STUDENT SELECT FIELD */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Student</InputLabel>
          <Select
            value={selectedStudent}
            label="Student"
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            {students.map((student) => (
              <MenuItem key={student.student_id} value={student.student_id}>
                {/* Show either the student's name or ID */}
                {`${student.student_name} (ID: ${student.student_id}, Class: ${student.class_id})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* SCORE FIELD */}
        <TextField
          label="Score"
          variant="outlined"
          fullWidth
          margin="normal"
          value={scoreValue}
          onChange={(e) => setScoreValue(e.target.value)}
        />

        <Button variant="contained" sx={{ mt: 2 }} type="submit">
          Submit
        </Button>
      </form>

      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </div>
  );
}

export default TeacherScores;
