import React, { useState, useEffect } from "react";
import { getTeacherClasses } from "../services/api";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
} from "@mui/material";

function TeacherClasses() {
  const [teacherId, setTeacherId] = useState(null);
  const [classes, setClasses] = useState([]);

  // Decode teacher_id from the JWT stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Token format: header.payload.signature
      const tokenParts = token.split(".");
      // index 1 is the payload
      const payloadB64 = tokenParts[1];
      // decode base64 -> JSON string
      const rawPayload = atob(payloadB64);
      const payload = JSON.parse(rawPayload);

      if (payload.user_id) {
        setTeacherId(payload.user_id);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, []);

  // Fetch the teacher’s assigned classes
  useEffect(() => {
    async function fetchAssignedClasses() {
      if (!teacherId) return;
      try {
        const token = localStorage.getItem("token");
        const response = await getTeacherClasses(teacherId, token);
        setClasses(response.data);
      } catch (err) {
        console.error("Error fetching teacher classes:", err);
      }
    }

    fetchAssignedClasses();
  }, [teacherId]);

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Classes Assigned to You
      </Typography>
      {/* If classes is empty, we might show a message */}
      {classes.length === 0 && (
        <Typography>No classes assigned or none found.</Typography>
      )}

      {classes.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Class ID</TableCell>
                <TableCell>Class Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {classes.map((c) => (
                <TableRow key={c.class_id}>
                  <TableCell>{c.class_id}</TableCell>
                  <TableCell>{c.class_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}

export default TeacherClasses;
