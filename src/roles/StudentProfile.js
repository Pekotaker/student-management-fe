import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function StudentProfile() {
  // In a real app, we'd fetch user info from the backend.
  // Here, we just show placeholders.

  const email = "student@example.com";
  const name = "John Student";
  const gender = "M";
  const dateOfBirth = "2001-05-10";

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <Typography>
        <strong>Email:</strong> {email}
      </Typography>
      <Typography>
        <strong>Name:</strong> {name}
      </Typography>
      <Typography>
        <strong>Gender:</strong> {gender}
      </Typography>
      <Typography>
        <strong>Date of Birth:</strong> {dateOfBirth}
      </Typography>
    </Container>
  );
}

export default StudentProfile;
