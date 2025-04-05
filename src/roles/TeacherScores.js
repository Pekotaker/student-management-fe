import React, { useState, useEffect } from "react";
import { addTeacherScore, getTeacherStudents, getSubject } from "../services/api";
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
  const [subjectId, setSubjectId] = useState(""); // subject ID
  const [subjectName, setSubjectName] = useState(""); // subject name
  const [students, setStudents] = useState([]); // store fetched students
  const [selectedStudent, setSelectedStudent] = useState("");
  const [scoreValue, setScoreValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

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

  // Whenever teacherId is set, fetch the list of assigned students and the subject
  useEffect(() => {
    async function fetchStudents() {
      try {
        if (!teacherId) return;
        const token = localStorage.getItem("token");
        const response = await getTeacherStudents(teacherId, token);
        setStudents(response.data);

        console.log(response.data);
      } catch (err) {
        setError("Error fetching students");
        console.error("Error fetching students", err);
      }
    }
    async function fetchSubject() {
      try {
        if (!teacherId) return;
        const token = localStorage.getItem("token");
        const response = await getSubject(teacherId, token);
        setSubjectId(response.data.subject_id);
        setSubjectName(response.data.subject_name);
        
        console.log(response.data);
      } catch (err) {
        setError("Error fetching subject");
        console.error("Error fetching subject", err);
      }
    }
    fetchSubject();
    fetchStudents();
  }, [teacherId]);

  // Whenever subjectId is set, fetch the subject


  async function handleScore(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await addTeacherScore(
        {
          student_id: selectedStudent, // the ID from the select
          teacher_id: teacherId,
          subject_id: subjectId,
          score_value: scoreValue,
        },
        token
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage("Error adding score");
      setError("Error adding score");
      console.error("Error adding score", err);
    }
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        My subject: {subjectName}
      </Typography>
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

      {message && 
        <Typography sx={{ mt: 2 }} color={error ? "error" : "success"}>
          {message}
        </Typography>
      }
    </div>
  );
}

export default TeacherScores;
