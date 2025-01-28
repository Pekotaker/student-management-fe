import React, { useEffect, useState } from "react";
import { getStudentSchedule } from "../services/api";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function StudentSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const token = localStorage.getItem("token");
        const tokenParts = token.split(".");
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const payload = JSON.parse(rawPayload);
        const userId = payload.user_id;
        const response = await getStudentSchedule(userId, token);
        setSchedule(response.data);
      } catch (err) {
        setError("Unable to fetch schedule.");
      }
    }
    fetchSchedule();
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        My Schedule
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time Slot</TableCell>
              <TableCell>Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule
              .sort((a, b) => a.time_slot - b.time_slot)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.time_slot}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default StudentSchedule;
