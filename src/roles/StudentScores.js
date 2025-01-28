import React, { useEffect, useState } from "react";
import { getStudentScores } from "../services/api";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function StudentScores() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchScores() {
      try {
        const token = localStorage.getItem("token");
        // For demonstration, we assume userId=1.
        // Real app: decode JWT or store userId in localStorage.
        // const userId = 1;

        // Get userId from token: decode JWT
        const tokenParts = token.split(".");
        const encodedPayload = tokenParts[1];
        const rawPayload = atob(encodedPayload);
        const payload = JSON.parse(rawPayload);
        const userId = payload.user_id;

        const response = await getStudentScores(userId, token);
        setScores(response.data);
      } catch (err) {
        setError("Unable to fetch scores.");
      }
    }

    fetchScores();
  }, []);

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        My Scores
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {scores.map((score, index) => (
        <Typography key={index}>
          {score.subject}: {score.score}
        </Typography>
      ))}
    </Container>
  );
}

export default StudentScores;
